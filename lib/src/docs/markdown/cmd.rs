use crate::docs::markdown::renderer::MarkdownRenderer;
use crate::error::UsageErr;
use crate::SpecCommand;

impl MarkdownRenderer<'_> {
    pub fn render_cmd(&self, cmd: &SpecCommand) -> Result<String, UsageErr> {
        let mut ctx = self.clone();
        ctx.insert("cmd", cmd);
        ctx.render("cmd_template.md.tera")
    }
}

#[cfg(test)]
mod tests {
    use crate::docs::markdown::renderer::MarkdownRenderer;
    use crate::test::SPEC_KITCHEN_SINK;
    use insta::assert_snapshot;

    #[test]
    fn test_render_markdown_cmd() {
        let ctx = MarkdownRenderer::new(&SPEC_KITCHEN_SINK).with_multi(true);
        assert_snapshot!(ctx.render_cmd(&SPEC_KITCHEN_SINK.cmd).unwrap(), @r"
        # `mycli`

        - **Usage**: `mycli [FLAGS] <ARGS>… <SUBCOMMAND>`

        ## Arguments

        ### `<arg1>`

        arg1 description

        ### `[arg2]`

        arg2 description

        **Choices:**

        - `choice1`
        - `choice2`
        - `choice3`

        **Default:** `default value`

        ### `<arg3>`

        arg3 long description

        ### `<argrest>...`

        ### `[with-default]`

        **Default:** `default value`

        ## Flags

        ### `--flag1`

        flag1 description

        ### `--flag2`

        flag2 long description

        ### `--flag3`

        flag3 description

        ### `--with-default`

        **Default:** `default value`

        ### `--shell <shell>`

        **Choices:**

        - `bash`
        - `zsh`
        - `fish`

        ## Subcommands

        - [`mycli plugin <SUBCOMMAND>`](/plugin.md)
        ");
    }
}
