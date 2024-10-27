use std::ops::Index;
use std::path::{Path, PathBuf};
use std::vec;

use clap::Args;
use indexmap::IndexMap;
use itertools::Itertools;
use usage::{Spec, SpecArg, SpecCommand, SpecComplete, SpecFlag, SpecMount};

use serde::{Deserialize, Serialize, Serializer};


#[derive(Args)]
#[clap()]
pub struct Fig {
    /// A usage spec taken in as a file
    #[clap(short, long)]
    file: PathBuf,
    // /// Pass a usage spec in an argument instead of a file
    // #[clap(short, long, required_unless_present = "file", overrides_with = "file")]
    // spec: Option<String>,
    /// Render each subcommand as a separate markdown file
    #[clap(short, long, requires = "out_dir", conflicts_with = "out_file")]
    multi: bool,

    /// Prefix to add to all URLs
    #[clap(long)]
    url_prefix: Option<String>,

    /// Escape HTML in markdown
    #[clap(long)]
    html_encode: bool,

    /// Output markdown files to this directory
    #[clap(long, value_hint = clap::ValueHint::DirPath)]
    out_dir: Option<PathBuf>,

    #[clap(long, value_hint = clap::ValueHint::FilePath, required_unless_present = "multi")]
    out_file: Option<PathBuf>,
}

#[derive(Serialize, Deserialize, Clone)]
enum GeneratorType {
    EnvVar,
    Custom
}

#[derive(Deserialize, Clone)]
struct FigGenerator {
    type_: GeneratorType,
    name: String,
    script: String,
    post_process: String,
    template_str: String,
}

impl Serialize for FigGenerator {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error> 
        where
            S: Serializer {
        serializer.serialize_str(&self.template_str)
    }
}

#[derive(Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")] 
struct FigArg {
    name: String,
    is_optional: bool,
    is_variadic: bool,
    #[serde(skip_serializing_if = "Option::is_none")]
    template: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    generators: Option<FigGenerator>
}

#[derive(Serialize, Deserialize)]
struct FigOption {
    name: Vec<String>,
    description: Option<String>,
    #[serde(rename(serialize = "isRepeatable"))]
    is_repeatable: bool,
    args: Option<FigArg>
}

#[derive(Serialize, Deserialize)]
struct FigCommand {
    name: Vec<String>,
    description: Option<String>,
    #[serde(skip_serializing_if = "Vec::is_empty")]
    subcommands: Vec<FigCommand>,
    #[serde(skip_serializing_if = "Vec::is_empty")]
    options: Vec<FigOption>,
    #[serde(skip_serializing_if = "Vec::is_empty")]
    args: Vec<FigArg>,
    #[serde(skip)]
    generator: Vec<FigGenerator>
}

impl FigGenerator {
    pub fn create_env_generator() -> Self {
        Self {
            type_: GeneratorType::EnvVar,
            name: String::from("envVarGenerator"),
            script: String::from("sh -c env"),
            template_str: String::from("$ENV_VAR_GENERATOR$"),
            post_process: String::from("return output.split('\\n').map(l => { name: l.split('=')[0]})")
        }
    }
    pub fn create_from_mount(mount: &SpecMount) -> Self {
        let tokens = mount.run.split(" ").collect_vec();
        if tokens.len() <= 2 {
            panic!("Invalid mount {mount}");
        }
        let name = tokens.iter().rev().nth(1).unwrap(); // Last one will be --usage
        Self {
            type_: GeneratorType::Custom,
            name: name.to_string(),
            script: mount.run.clone(),
            template_str: format!("${name}$"),
            post_process: "test".to_string()
        }
    }
}

impl FigArg {

    fn get_template(name: &String) -> Option<String> {
        name.to_lowercase().contains("file")
            .then(|| "filepaths".to_string())
            .or(name.to_lowercase().contains("dir").then(|| "folders".to_string()))
            .or(name.to_lowercase().contains("path").then(|| "filepaths".to_string()))
            .or_else(|| {println!("Unknown name {name}"); None})
    }

    fn get_generator(name: &String) -> Option<FigGenerator> {
        name.to_lowercase().contains("env_var")
        .then(|| FigGenerator::create_env_generator())
    } 

    pub fn get_generators(&self) -> Vec<FigGenerator> {
        match self.generators.clone() {
            Some(a) => vec![a],
            None => vec![]
        }
    }

    fn get_name(name: &String) -> String {
        name.replace("<", "")
            .replace(">", "")
            .replace("[", "")
            .replace("]", "").to_ascii_lowercase()
    }

    pub fn parse_from_spec(arg: &SpecArg) -> Self {
        // Need to parse name for <> and [] to figure out if optional 
        Self {
            name: FigArg::get_name(&arg.name),
            is_variadic: arg.var, 
            is_optional: !arg.required,// FigArg::is_optional(&arg.name),
            template: FigArg::get_template(&arg.name),
            generators: FigArg::get_generator(&arg.name)
        }
    }

    pub fn update_from_complete(&self, spec: SpecComplete) {
        self.generators = Some(FigGenerator {
            type_: GeneratorType::Custom,
            name: 
        })
    }
}

impl FigOption {
    fn get_names(flag: &SpecFlag) -> Vec<String> {
        let mut n: Vec<String> = flag.short.iter().map(|c|format!("-{c}")).collect();
        n.extend(flag.long.iter().map(|l| format!("--{l}")));
        return n
    }

    pub fn get_generators(&self) -> Vec<FigGenerator> {
        self.args.iter().cloned()
        .filter(|a| a.generators.is_some())
        .map(|a| a.generators.unwrap())
        .collect()
    }

    pub fn get_args(&self) -> Vec<&FigArg> {
        self.args.iter().collect_vec()
    }

    pub fn parse_from_spec(flag: &SpecFlag) -> Self {
        Self {
            name: FigOption::get_names(flag),
            description: flag.help.clone(),
            is_repeatable: flag.var,
            args: flag.arg.clone().map(|arg | FigArg::parse_from_spec(&arg))
        }
    }   
}
impl FigCommand {
    fn get_names(cmd: &SpecCommand) -> Vec<String> {
        let mut r = vec![cmd.name.clone()];
        r.extend(cmd.aliases.clone());
        r
    }

    fn get_generator(cmd: &SpecCommand) -> Vec<FigGenerator> {
        cmd.mounts.iter().map(|m| FigGenerator::create_from_mount(m)).collect()
    }

    pub fn get_generators(&self) -> Vec<FigGenerator> {
        let sub = self.subcommands.iter()
            .map(|s| s.get_generators())
            .collect_vec().concat();
        let opt = self.options.iter().map(|o| o.get_generators()).collect_vec().concat();
        let args = self.args.iter().map(|a| a.get_generators()).collect_vec().concat();
        [sub,opt,args].concat()
    }

    pub fn get_args(&self) -> Vec<&FigArg> {
        let opt_args = self.options.iter()
            .map(|o| o.get_args()).collect_vec().concat();
        let sub_args = self.subcommands.iter()
            .map(|c| c.get_args()).collect_vec().concat();
        let args = self.args.iter().map(|a| a).collect_vec();
        [opt_args,sub_args,args].concat()
    }

    pub fn parse_from_spec(cmd: &SpecCommand) -> Option<Self> {
        (!cmd.hide).then(|| Self {
            name: FigCommand::get_names(cmd),
            description: cmd.help.clone(),
            subcommands: cmd.subcommands.iter()
                .filter(|(_, v)| !v.hide)
                .map(|(_, v)| FigCommand::parse_from_spec(v))
                .flatten()
                .collect(),
            options: cmd.flags.iter()
                .filter(|f| !f.hide)
                .map(|flag| FigOption::parse_from_spec(flag))
                .collect(),
            args: cmd.args.iter()
                .filter(|a| !a.hide)
                .map(|arg| FigArg::parse_from_spec(arg))
                .collect(),
            generator: FigCommand::get_generator(cmd)
        })
    }
}
#[derive(Clone)]
struct RecursiveContext {
    ident: usize,
    parents: Vec<String>,
    current_node: String
}

impl RecursiveContext {
    pub fn new() -> Self {
        Self {
            ident: 1,
            parents: vec![],
            current_node: String::from("")
        }
    }

    pub fn incr(&mut self) {
        self.ident += 1;
    }

    pub fn reset_ident(&mut self) {
        self.ident = 0
    }

    pub fn drill_down(&mut self, child: String) {
        self.incr();
        self.parents.push(self.current_node.clone());
        self.current_node = child;
    }

    pub fn drill_up(&mut self) {
        self.ident -= 1;
        self.current_node = self.parents.pop().unwrap();
    }
}

impl Fig {
    /*
    fn list_helper(mut l: impl Iterator<Item = String>) -> String {
        if l.size_hint().1.unwrap_or(0) == 0 {
            return String::from("");
        } else {
            return l.join(",");
        }
    }
    */

    fn get_generator_text() -> String {
        "import * as Generators from '../generators';".to_string()
    }

    fn fill_args_complete(args: Vec<&FigArg>, completes: IndexMap<String, SpecComplete>) {
        let completable_args = args.into_iter().map(|a| {
            let completekv = completes.get_key_value(&a.name);
            completekv.and_then(|(_,v)| v.clone().run)
        }).filter(Option::is_some);

    }

    pub fn run(&self) -> miette::Result<()> {
        let write = |path: &PathBuf, md: &str| -> miette::Result<()> {
            println!("writing to {}", path.display());
            xx::file::write(path, format!("{}\n", md.trim()))?;
            Ok(())
        };
        let (spec, _) = Spec::parse_file(&self.file)?;
        let main_command = FigCommand::parse_from_spec(&spec.cmd).unwrap();
        let j = serde_json::to_string_pretty(&main_command).unwrap();
        let path = self.out_file.clone().unwrap_or(PathBuf::from(".(mise.test.ts"));
        let mut result = format!("const completionSpec: Fig.Spec = {j}");

        let generators = main_command.get_generators();
        let generator_text = Fig::get_generator_text();
        generators.iter().cloned().for_each(|g| {
            let template_str = g.template_str;
            let generator_name = g.name;
            let generator_postprocess = g.post_process;
            let arg = (g.type_ == GeneratorType::Custom)
                .then(format!("({generator_postprocess})"));
            result = result.replace(format!("\"{template_str}\"").as_str(), format!("Generators.{generator_name}").as_str())
        });
        let args = main_command.get_args();
        let completes = spec.complete;
        Fig::fill_args_complete(args, completes);

        result = [[generator_text, result, "export default completionSpec;".to_string()]].concat().join("\n\n");
        write(&path, result.as_str());
        Ok(())
    }

    /*
    fn old_run(&self) {
        let mut ctx = RecursiveContext::new();
        let name = spec.cmd.name;
        ctx.drill_down(name.clone());
        let mut subcommands = spec.cmd.subcommands.into_iter().map(|(k, v)| self.parse_command(ctx.clone(), k,v));
        let description = spec.cmd.help.unwrap_or(String::from(""));
        let subcommand_str = subcommands.join(",\n    ");
        let path = PathBuf::from("./mise.test.ts");
        let full_str = format!("{{
        name: \"{name}\",
        description: `{description}`,
        subcommands: [
        {subcommand_str}
        ]
        }}");
                
                return write(&path, full_str.as_str());
    }
     */
}
