import * as Generators from '../generators';

const completionSpec: Fig.Spec = {
  "name": [
    "mise"
  ],
  "description": null,
  "subcommands": [
    {
      "name": [
        "activate"
      ],
      "description": "Initializes mise in the current shell session",
      "options": [
        {
          "name": [
            "--shims"
          ],
          "description": "Use shims instead of modifying PATH\nEffectively the same as:",
          "isRepeatable": false,
          "args": null
        },
        {
          "name": [
            "-q",
            "--quiet"
          ],
          "description": "Suppress non-error messages",
          "isRepeatable": false,
          "args": null
        }
      ],
      "args": [
        {
          "name": "shell_type",
          "isOptional": true,
          "isVariadic": false
        }
      ]
    },
    {
      "name": [
        "alias",
        "a"
      ],
      "description": "Manage aliases",
      "subcommands": [
        {
          "name": [
            "get"
          ],
          "description": "Show an alias for a plugin",
          "args": [
            {
              "name": "plugin",
              "isOptional": false,
              "isVariadic": false
            },
            {
              "name": "alias",
              "isOptional": false,
              "isVariadic": false
            }
          ]
        },
        {
          "name": [
            "ls",
            "list"
          ],
          "description": "List aliases\nShows the aliases that can be specified.\nThese can come from user config or from plugins in `bin/list-aliases`.",
          "options": [
            {
              "name": [
                "--no-header"
              ],
              "description": "Don't show table header",
              "isRepeatable": false,
              "args": null
            }
          ],
          "args": [
            {
              "name": "plugin",
              "isOptional": true,
              "isVariadic": false
            }
          ]
        },
        {
          "name": [
            "set",
            "add",
            "create"
          ],
          "description": "Add/update an alias for a plugin",
          "args": [
            {
              "name": "plugin",
              "isOptional": false,
              "isVariadic": false
            },
            {
              "name": "alias",
              "isOptional": false,
              "isVariadic": false
            },
            {
              "name": "value",
              "isOptional": false,
              "isVariadic": false
            }
          ]
        },
        {
          "name": [
            "unset",
            "rm",
            "remove",
            "delete",
            "del"
          ],
          "description": "Clears an alias for a plugin",
          "args": [
            {
              "name": "plugin",
              "isOptional": false,
              "isVariadic": false
            },
            {
              "name": "alias",
              "isOptional": false,
              "isVariadic": false
            }
          ]
        }
      ],
      "options": [
        {
          "name": [
            "-p",
            "--plugin"
          ],
          "description": "filter aliases by plugin",
          "isRepeatable": false,
          "args": {
            "name": "plugin",
            "isOptional": false,
            "isVariadic": false
          }
        },
        {
          "name": [
            "--no-header"
          ],
          "description": "Don't show table header",
          "isRepeatable": false,
          "args": null
        }
      ]
    },
    {
      "name": [
        "backends",
        "b"
      ],
      "description": "Manage backends",
      "subcommands": [
        {
          "name": [
            "ls",
            "list"
          ],
          "description": "List built-in backends"
        }
      ]
    },
    {
      "name": [
        "bin-paths"
      ],
      "description": "List all the active runtime bin paths"
    },
    {
      "name": [
        "cache"
      ],
      "description": "Manage the mise cache",
      "subcommands": [
        {
          "name": [
            "clear",
            "c"
          ],
          "description": "Deletes all cache files in mise",
          "args": [
            {
              "name": "plugin",
              "isOptional": true,
              "isVariadic": true
            }
          ]
        },
        {
          "name": [
            "prune",
            "p"
          ],
          "description": "Removes stale mise cache files",
          "options": [
            {
              "name": [
                "--dry-run"
              ],
              "description": "Just show what would be pruned",
              "isRepeatable": false,
              "args": null
            },
            {
              "name": [
                "-v",
                "--verbose"
              ],
              "description": "Show pruned files",
              "isRepeatable": true,
              "args": null
            }
          ],
          "args": [
            {
              "name": "plugin",
              "isOptional": true,
              "isVariadic": true
            }
          ]
        }
      ]
    },
    {
      "name": [
        "completion"
      ],
      "description": "Generate shell completions",
      "args": [
        {
          "name": "shell",
          "isOptional": true,
          "isVariadic": false
        }
      ]
    },
    {
      "name": [
        "config",
        "cfg"
      ],
      "description": "Manage config files",
      "subcommands": [
        {
          "name": [
            "generate",
            "g"
          ],
          "description": "[experimental] Generate a mise.toml file",
          "options": [
            {
              "name": [
                "-o",
                "--output"
              ],
              "description": "Output to file instead of stdout",
              "isRepeatable": false,
              "args": {
                "name": "output",
                "isOptional": false,
                "isVariadic": false
              }
            }
          ]
        },
        {
          "name": [
            "get"
          ],
          "description": "Display the value of a setting in a mise.toml file",
          "options": [
            {
              "name": [
                "-f",
                "--file"
              ],
              "description": "The path to the mise.toml file to edit",
              "isRepeatable": false,
              "args": {
                "name": "file",
                "isOptional": false,
                "isVariadic": false,
                "template": "filepaths"
              }
            }
          ],
          "args": [
            {
              "name": "key",
              "isOptional": true,
              "isVariadic": false
            }
          ]
        },
        {
          "name": [
            "ls"
          ],
          "description": "List config files currently in use",
          "options": [
            {
              "name": [
                "--no-header"
              ],
              "description": "Do not print table header",
              "isRepeatable": false,
              "args": null
            }
          ]
        },
        {
          "name": [
            "set"
          ],
          "description": "Display the value of a setting in a mise.toml file",
          "options": [
            {
              "name": [
                "-f",
                "--file"
              ],
              "description": "The path to the mise.toml file to edit",
              "isRepeatable": false,
              "args": {
                "name": "file",
                "isOptional": false,
                "isVariadic": false,
                "template": "filepaths"
              }
            },
            {
              "name": [
                "-t",
                "--type"
              ],
              "description": null,
              "isRepeatable": false,
              "args": {
                "name": "type",
                "isOptional": false,
                "isVariadic": false
              }
            }
          ],
          "args": [
            {
              "name": "key",
              "isOptional": false,
              "isVariadic": false
            },
            {
              "name": "value",
              "isOptional": false,
              "isVariadic": false
            }
          ]
        }
      ],
      "options": [
        {
          "name": [
            "--no-header"
          ],
          "description": "Do not print table header",
          "isRepeatable": false,
          "args": null
        }
      ]
    },
    {
      "name": [
        "current"
      ],
      "description": "Shows current active and installed runtime versions",
      "args": [
        {
          "name": "plugin",
          "isOptional": true,
          "isVariadic": false
        }
      ]
    },
    {
      "name": [
        "deactivate"
      ],
      "description": "Disable mise for current shell session"
    },
    {
      "name": [
        "direnv"
      ],
      "description": "Output direnv function to use mise inside direnv",
      "subcommands": [
        {
          "name": [
            "activate"
          ],
          "description": "Output direnv function to use mise inside direnv"
        }
      ]
    },
    {
      "name": [
        "doctor",
        "dr"
      ],
      "description": "Check mise installation for possible problems"
    },
    {
      "name": [
        "env",
        "e"
      ],
      "description": "Exports env vars to activate mise a single time",
      "options": [
        {
          "name": [
            "-J",
            "--json"
          ],
          "description": "Output in JSON format",
          "isRepeatable": false,
          "args": null
        },
        {
          "name": [
            "-s",
            "--shell"
          ],
          "description": "Shell type to generate environment variables for",
          "isRepeatable": false,
          "args": {
            "name": "shell",
            "isOptional": false,
            "isVariadic": false
          }
        }
      ],
      "args": [
        {
          "name": "tool@version",
          "isOptional": true,
          "isVariadic": true
        }
      ]
    },
    {
      "name": [
        "exec",
        "x"
      ],
      "description": "Execute a command with tool(s) set",
      "options": [
        {
          "name": [
            "-c",
            "--command"
          ],
          "description": "Command string to execute",
          "isRepeatable": false,
          "args": {
            "name": "c",
            "isOptional": false,
            "isVariadic": false
          }
        },
        {
          "name": [
            "-j",
            "--jobs"
          ],
          "description": "Number of jobs to run in parallel\n[default: 4]",
          "isRepeatable": false,
          "args": {
            "name": "jobs",
            "isOptional": false,
            "isVariadic": false
          }
        },
        {
          "name": [
            "--raw"
          ],
          "description": "Directly pipe stdin/stdout/stderr from plugin to user Sets --jobs=1",
          "isRepeatable": false,
          "args": null
        }
      ],
      "args": [
        {
          "name": "tool@version",
          "isOptional": true,
          "isVariadic": true
        },
        {
          "name": "command",
          "isOptional": true,
          "isVariadic": true
        }
      ]
    },
    {
      "name": [
        "generate",
        "g"
      ],
      "description": "[experimental] Generate files for various tools/services",
      "subcommands": [
        {
          "name": [
            "git-pre-commit",
            "pre-commit"
          ],
          "description": "[experimental] Generate a git pre-commit hook",
          "options": [
            {
              "name": [
                "--hook"
              ],
              "description": "Which hook to generate (saves to .git/hooks/$hook)",
              "isRepeatable": false,
              "args": {
                "name": "hook",
                "isOptional": false,
                "isVariadic": false
              }
            },
            {
              "name": [
                "-t",
                "--task"
              ],
              "description": "The task to run when the pre-commit hook is triggered",
              "isRepeatable": false,
              "args": {
                "name": "task",
                "isOptional": false,
                "isVariadic": false
              }
            },
            {
              "name": [
                "-w",
                "--write"
              ],
              "description": "write to .git/hooks/pre-commit and make it executable",
              "isRepeatable": false,
              "args": null
            }
          ]
        },
        {
          "name": [
            "github-action"
          ],
          "description": "[experimental] Generate a GitHub Action workflow file",
          "options": [
            {
              "name": [
                "-n",
                "--name"
              ],
              "description": "the name of the workflow to generate",
              "isRepeatable": false,
              "args": {
                "name": "name",
                "isOptional": false,
                "isVariadic": false
              }
            },
            {
              "name": [
                "-t",
                "--task"
              ],
              "description": "The task to run when the workflow is triggered",
              "isRepeatable": false,
              "args": {
                "name": "task",
                "isOptional": false,
                "isVariadic": false
              }
            },
            {
              "name": [
                "-w",
                "--write"
              ],
              "description": "write to .github/workflows/$name.yml",
              "isRepeatable": false,
              "args": null
            }
          ]
        },
        {
          "name": [
            "task-docs"
          ],
          "description": "[experimental] Generate documentation for tasks in a project",
          "options": [
            {
              "name": [
                "-I",
                "--index"
              ],
              "description": "write only an index of tasks, intended for use with `--multi`",
              "isRepeatable": false,
              "args": null
            },
            {
              "name": [
                "-i",
                "--inject"
              ],
              "description": "inserts the documentation into an existing file",
              "isRepeatable": false,
              "args": null
            },
            {
              "name": [
                "-m",
                "--multi"
              ],
              "description": "render each task as a separate document, requires `--output` to be a directory",
              "isRepeatable": false,
              "args": null
            },
            {
              "name": [
                "-o",
                "--output"
              ],
              "description": "writes the generated docs to a file/directory",
              "isRepeatable": false,
              "args": {
                "name": "output",
                "isOptional": false,
                "isVariadic": false
              }
            },
            {
              "name": [
                "-r",
                "--root"
              ],
              "description": "root directory to search for tasks",
              "isRepeatable": false,
              "args": {
                "name": "root",
                "isOptional": false,
                "isVariadic": false
              }
            },
            {
              "name": [
                "-s",
                "--style"
              ],
              "description": null,
              "isRepeatable": false,
              "args": {
                "name": "style",
                "isOptional": false,
                "isVariadic": false
              }
            }
          ]
        }
      ]
    },
    {
      "name": [
        "implode"
      ],
      "description": "Removes mise CLI and all related data",
      "options": [
        {
          "name": [
            "--config"
          ],
          "description": "Also remove config directory",
          "isRepeatable": false,
          "args": null
        },
        {
          "name": [
            "-n",
            "--dry-run"
          ],
          "description": "List directories that would be removed without actually removing them",
          "isRepeatable": false,
          "args": null
        }
      ]
    },
    {
      "name": [
        "install",
        "i"
      ],
      "description": "Install a tool version",
      "options": [
        {
          "name": [
            "-f",
            "--force"
          ],
          "description": "Force reinstall even if already installed",
          "isRepeatable": false,
          "args": null
        },
        {
          "name": [
            "-j",
            "--jobs"
          ],
          "description": "Number of jobs to run in parallel\n[default: 4]",
          "isRepeatable": false,
          "args": {
            "name": "jobs",
            "isOptional": false,
            "isVariadic": false
          }
        },
        {
          "name": [
            "--raw"
          ],
          "description": "Directly pipe stdin/stdout/stderr from plugin to user Sets --jobs=1",
          "isRepeatable": false,
          "args": null
        },
        {
          "name": [
            "-v",
            "--verbose"
          ],
          "description": "Show installation output",
          "isRepeatable": true,
          "args": null
        }
      ],
      "args": [
        {
          "name": "tool@version",
          "isOptional": true,
          "isVariadic": true
        }
      ]
    },
    {
      "name": [
        "latest"
      ],
      "description": "Gets the latest available version for a plugin",
      "options": [
        {
          "name": [
            "-i",
            "--installed"
          ],
          "description": "Show latest installed instead of available version",
          "isRepeatable": false,
          "args": null
        }
      ],
      "args": [
        {
          "name": "tool@version",
          "isOptional": false,
          "isVariadic": false
        }
      ]
    },
    {
      "name": [
        "link",
        "ln"
      ],
      "description": "Symlinks a tool version into mise",
      "options": [
        {
          "name": [
            "-f",
            "--force"
          ],
          "description": "Overwrite an existing tool version if it exists",
          "isRepeatable": false,
          "args": null
        }
      ],
      "args": [
        {
          "name": "tool@version",
          "isOptional": false,
          "isVariadic": false
        },
        {
          "name": "path",
          "isOptional": false,
          "isVariadic": false,
          "template": "filepaths"
        }
      ]
    },
    {
      "name": [
        "ls",
        "list"
      ],
      "description": "List installed and active tool versions",
      "options": [
        {
          "name": [
            "-c",
            "--current"
          ],
          "description": "Only show tool versions currently specified in a mise.toml",
          "isRepeatable": false,
          "args": null
        },
        {
          "name": [
            "-g",
            "--global"
          ],
          "description": "Only show tool versions currently specified in the global mise.toml",
          "isRepeatable": false,
          "args": null
        },
        {
          "name": [
            "-i",
            "--installed"
          ],
          "description": "Only show tool versions that are installed (Hides tools defined in mise.toml but not installed)",
          "isRepeatable": false,
          "args": null
        },
        {
          "name": [
            "-J",
            "--json"
          ],
          "description": "Output in JSON format",
          "isRepeatable": false,
          "args": null
        },
        {
          "name": [
            "-m",
            "--missing"
          ],
          "description": "Display missing tool versions",
          "isRepeatable": false,
          "args": null
        },
        {
          "name": [
            "--prefix"
          ],
          "description": "Display versions matching this prefix",
          "isRepeatable": false,
          "args": {
            "name": "prefix",
            "isOptional": false,
            "isVariadic": false
          }
        },
        {
          "name": [
            "--no-header"
          ],
          "description": "Don't display headers",
          "isRepeatable": false,
          "args": null
        }
      ],
      "args": [
        {
          "name": "plugin",
          "isOptional": true,
          "isVariadic": true
        }
      ]
    },
    {
      "name": [
        "ls-remote"
      ],
      "description": "List runtime versions available for install.",
      "options": [
        {
          "name": [
            "--all"
          ],
          "description": "Show all installed plugins and versions",
          "isRepeatable": false,
          "args": null
        }
      ],
      "args": [
        {
          "name": "tool@version",
          "isOptional": true,
          "isVariadic": false
        },
        {
          "name": "prefix",
          "isOptional": true,
          "isVariadic": false
        }
      ]
    },
    {
      "name": [
        "outdated"
      ],
      "description": "Shows outdated tool versions",
      "options": [
        {
          "name": [
            "-l",
            "--bump"
          ],
          "description": "Compares against the latest versions available, not what matches the current config",
          "isRepeatable": false,
          "args": null
        },
        {
          "name": [
            "-J",
            "--json"
          ],
          "description": "Output in JSON format",
          "isRepeatable": false,
          "args": null
        },
        {
          "name": [
            "--no-header"
          ],
          "description": "Don't show table header",
          "isRepeatable": false,
          "args": null
        }
      ],
      "args": [
        {
          "name": "tool@version",
          "isOptional": true,
          "isVariadic": true
        }
      ]
    },
    {
      "name": [
        "plugins",
        "p"
      ],
      "description": "Manage plugins",
      "subcommands": [
        {
          "name": [
            "install",
            "i",
            "a",
            "add"
          ],
          "description": "Install a plugin",
          "options": [
            {
              "name": [
                "-f",
                "--force"
              ],
              "description": "Reinstall even if plugin exists",
              "isRepeatable": false,
              "args": null
            },
            {
              "name": [
                "-a",
                "--all"
              ],
              "description": "Install all missing plugins\nThis will only install plugins that have matching shorthands.\ni.e.: they don't need the full git repo url",
              "isRepeatable": false,
              "args": null
            },
            {
              "name": [
                "-v",
                "--verbose"
              ],
              "description": "Show installation output",
              "isRepeatable": true,
              "args": null
            }
          ],
          "args": [
            {
              "name": "new_plugin",
              "isOptional": true,
              "isVariadic": false
            },
            {
              "name": "git_url",
              "isOptional": true,
              "isVariadic": false
            }
          ]
        },
        {
          "name": [
            "link",
            "ln"
          ],
          "description": "Symlinks a plugin into mise",
          "options": [
            {
              "name": [
                "-f",
                "--force"
              ],
              "description": "Overwrite existing plugin",
              "isRepeatable": false,
              "args": null
            }
          ],
          "args": [
            {
              "name": "name",
              "isOptional": false,
              "isVariadic": false
            },
            {
              "name": "path",
              "isOptional": true,
              "isVariadic": false,
              "template": "filepaths"
            }
          ]
        },
        {
          "name": [
            "ls",
            "list"
          ],
          "description": "List installed plugins",
          "options": [
            {
              "name": [
                "-c",
                "--core"
              ],
              "description": "The built-in plugins only\nNormally these are not shown",
              "isRepeatable": false,
              "args": null
            },
            {
              "name": [
                "--user"
              ],
              "description": "List installed plugins",
              "isRepeatable": false,
              "args": null
            },
            {
              "name": [
                "-u",
                "--urls"
              ],
              "description": "Show the git url for each plugin\ne.g.: https://github.com/asdf-vm/asdf-nodejs.git",
              "isRepeatable": false,
              "args": null
            }
          ]
        },
        {
          "name": [
            "ls-remote",
            "list-remote",
            "list-all"
          ],
          "description": "List all available remote plugins",
          "options": [
            {
              "name": [
                "-u",
                "--urls"
              ],
              "description": "Show the git url for each plugin e.g.: https://github.com/mise-plugins/mise-poetry.git",
              "isRepeatable": false,
              "args": null
            },
            {
              "name": [
                "--only-names"
              ],
              "description": "Only show the name of each plugin by default it will show a \"*\" next to installed plugins",
              "isRepeatable": false,
              "args": null
            }
          ]
        },
        {
          "name": [
            "uninstall",
            "remove",
            "rm"
          ],
          "description": "Removes a plugin",
          "options": [
            {
              "name": [
                "-p",
                "--purge"
              ],
              "description": "Also remove the plugin's installs, downloads, and cache",
              "isRepeatable": false,
              "args": null
            },
            {
              "name": [
                "-a",
                "--all"
              ],
              "description": "Remove all plugins",
              "isRepeatable": false,
              "args": null
            }
          ],
          "args": [
            {
              "name": "plugin",
              "isOptional": true,
              "isVariadic": true
            }
          ]
        },
        {
          "name": [
            "update",
            "up",
            "upgrade"
          ],
          "description": "Updates a plugin to the latest version",
          "options": [
            {
              "name": [
                "-j",
                "--jobs"
              ],
              "description": "Number of jobs to run in parallel\nDefault: 4",
              "isRepeatable": false,
              "args": {
                "name": "jobs",
                "isOptional": false,
                "isVariadic": false
              }
            }
          ],
          "args": [
            {
              "name": "plugin",
              "isOptional": true,
              "isVariadic": true
            }
          ]
        }
      ],
      "options": [
        {
          "name": [
            "-c",
            "--core"
          ],
          "description": "The built-in plugins only\nNormally these are not shown",
          "isRepeatable": false,
          "args": null
        },
        {
          "name": [
            "--user"
          ],
          "description": "List installed plugins",
          "isRepeatable": false,
          "args": null
        },
        {
          "name": [
            "-u",
            "--urls"
          ],
          "description": "Show the git url for each plugin\ne.g.: https://github.com/asdf-vm/asdf-nodejs.git",
          "isRepeatable": false,
          "args": null
        }
      ]
    },
    {
      "name": [
        "prune"
      ],
      "description": "Delete unused versions of tools",
      "options": [
        {
          "name": [
            "-n",
            "--dry-run"
          ],
          "description": "Do not actually delete anything",
          "isRepeatable": false,
          "args": null
        },
        {
          "name": [
            "--configs"
          ],
          "description": "Prune only tracked and trusted configuration links that point to non-existent configurations",
          "isRepeatable": false,
          "args": null
        },
        {
          "name": [
            "--tools"
          ],
          "description": "Prune only unused versions of tools",
          "isRepeatable": false,
          "args": null
        }
      ],
      "args": [
        {
          "name": "plugin",
          "isOptional": true,
          "isVariadic": true
        }
      ]
    },
    {
      "name": [
        "registry"
      ],
      "description": "[experimental] List available tools to install"
    },
    {
      "name": [
        "reshim"
      ],
      "description": "Creates new shims based on bin paths from currently installed tools.",
      "options": [
        {
          "name": [
            "-f",
            "--force"
          ],
          "description": "Removes all shims before reshimming",
          "isRepeatable": false,
          "args": null
        }
      ]
    },
    {
      "name": [
        "run",
        "r"
      ],
      "description": "[experimental] Run task(s)",
      "options": [
        {
          "name": [
            "-C",
            "--cd"
          ],
          "description": "Change to this directory before executing the command",
          "isRepeatable": false,
          "args": {
            "name": "cd",
            "isOptional": false,
            "isVariadic": false
          }
        },
        {
          "name": [
            "-n",
            "--dry-run"
          ],
          "description": "Don't actually run the tasks(s), just print them in order of execution",
          "isRepeatable": false,
          "args": null
        },
        {
          "name": [
            "-f",
            "--force"
          ],
          "description": "Force the tasks to run even if outputs are up to date",
          "isRepeatable": false,
          "args": null
        },
        {
          "name": [
            "-p",
            "--prefix"
          ],
          "description": "Print stdout/stderr by line, prefixed with the tasks's label\nDefaults to true if --jobs > 1\nConfigure with `task_output` config or `MISE_TASK_OUTPUT` env var",
          "isRepeatable": false,
          "args": null
        },
        {
          "name": [
            "-i",
            "--interleave"
          ],
          "description": "Print directly to stdout/stderr instead of by line\nDefaults to true if --jobs == 1\nConfigure with `task_output` config or `MISE_TASK_OUTPUT` env var",
          "isRepeatable": false,
          "args": null
        },
        {
          "name": [
            "-t",
            "--tool"
          ],
          "description": "Tool(s) to also add e.g.: node@20 python@3.10",
          "isRepeatable": true,
          "args": {
            "name": "tool@version",
            "isOptional": false,
            "isVariadic": false
          }
        },
        {
          "name": [
            "-j",
            "--jobs"
          ],
          "description": "Number of tasks to run in parallel\n[default: 4]\nConfigure with `jobs` config or `MISE_JOBS` env var",
          "isRepeatable": false,
          "args": {
            "name": "jobs",
            "isOptional": false,
            "isVariadic": false
          }
        },
        {
          "name": [
            "-r",
            "--raw"
          ],
          "description": "Read/write directly to stdin/stdout/stderr instead of by line\nConfigure with `raw` config or `MISE_RAW` env var",
          "isRepeatable": false,
          "args": null
        },
        {
          "name": [
            "--timings"
          ],
          "description": "Shows elapsed time after each tasks",
          "isRepeatable": false,
          "args": null
        }
      ]
    },
    {
      "name": [
        "self-update"
      ],
      "description": "Updates mise itself.",
      "options": [
        {
          "name": [
            "-f",
            "--force"
          ],
          "description": "Update even if already up to date",
          "isRepeatable": false,
          "args": null
        },
        {
          "name": [
            "--no-plugins"
          ],
          "description": "Disable auto-updating plugins",
          "isRepeatable": false,
          "args": null
        },
        {
          "name": [
            "-y",
            "--yes"
          ],
          "description": "Skip confirmation prompt",
          "isRepeatable": false,
          "args": null
        }
      ],
      "args": [
        {
          "name": "version",
          "isOptional": true,
          "isVariadic": false
        }
      ]
    },
    {
      "name": [
        "set"
      ],
      "description": "Set environment variables in mise.toml",
      "options": [
        {
          "name": [
            "--file"
          ],
          "description": "The TOML file to update",
          "isRepeatable": false,
          "args": {
            "name": "file",
            "isOptional": false,
            "isVariadic": false,
            "template": "filepaths"
          }
        },
        {
          "name": [
            "-g",
            "--global"
          ],
          "description": "Set the environment variable in the global config file",
          "isRepeatable": false,
          "args": null
        }
      ],
      "args": [
        {
          "name": "env_vars",
          "isOptional": true,
          "isVariadic": true,
          "generators": Generators.envVarGenerator
        }
      ]
    },
    {
      "name": [
        "settings"
      ],
      "description": "Manage settings",
      "subcommands": [
        {
          "name": [
            "add"
          ],
          "description": "Adds a setting to the configuration file",
          "args": [
            {
              "name": "setting",
              "isOptional": false,
              "isVariadic": false
            },
            {
              "name": "value",
              "isOptional": false,
              "isVariadic": false
            }
          ]
        },
        {
          "name": [
            "get"
          ],
          "description": "Show a current setting",
          "args": [
            {
              "name": "setting",
              "isOptional": false,
              "isVariadic": false
            }
          ]
        },
        {
          "name": [
            "ls",
            "list"
          ],
          "description": "Show current settings",
          "options": [
            {
              "name": [
                "--keys"
              ],
              "description": "Only display key names for each setting",
              "isRepeatable": false,
              "args": null
            }
          ]
        },
        {
          "name": [
            "set",
            "create"
          ],
          "description": "Add/update a setting",
          "args": [
            {
              "name": "setting",
              "isOptional": false,
              "isVariadic": false
            },
            {
              "name": "value",
              "isOptional": false,
              "isVariadic": false
            }
          ]
        },
        {
          "name": [
            "unset",
            "rm",
            "remove",
            "delete",
            "del"
          ],
          "description": "Clears a setting",
          "args": [
            {
              "name": "setting",
              "isOptional": false,
              "isVariadic": false
            }
          ]
        }
      ],
      "options": [
        {
          "name": [
            "--keys"
          ],
          "description": "Only display key names for each setting",
          "isRepeatable": false,
          "args": null
        }
      ]
    },
    {
      "name": [
        "shell",
        "sh"
      ],
      "description": "Sets a tool version for the current session.",
      "options": [
        {
          "name": [
            "-j",
            "--jobs"
          ],
          "description": "Number of jobs to run in parallel\n[default: 4]",
          "isRepeatable": false,
          "args": {
            "name": "jobs",
            "isOptional": false,
            "isVariadic": false
          }
        },
        {
          "name": [
            "--raw"
          ],
          "description": "Directly pipe stdin/stdout/stderr from plugin to user Sets --jobs=1",
          "isRepeatable": false,
          "args": null
        },
        {
          "name": [
            "-u",
            "--unset"
          ],
          "description": "Removes a previously set version",
          "isRepeatable": false,
          "args": null
        }
      ],
      "args": [
        {
          "name": "tool@version",
          "isOptional": true,
          "isVariadic": true
        }
      ]
    },
    {
      "name": [
        "sync"
      ],
      "description": "Add tool versions from external tools to mise",
      "subcommands": [
        {
          "name": [
            "node"
          ],
          "description": "Symlinks all tool versions from an external tool into mise",
          "options": [
            {
              "name": [
                "--brew"
              ],
              "description": "Get tool versions from Homebrew",
              "isRepeatable": false,
              "args": null
            },
            {
              "name": [
                "--nvm"
              ],
              "description": "Get tool versions from nvm",
              "isRepeatable": false,
              "args": null
            },
            {
              "name": [
                "--nodenv"
              ],
              "description": "Get tool versions from nodenv",
              "isRepeatable": false,
              "args": null
            }
          ]
        },
        {
          "name": [
            "python"
          ],
          "description": "Symlinks all tool versions from an external tool into mise",
          "options": [
            {
              "name": [
                "--pyenv"
              ],
              "description": "Get tool versions from pyenv",
              "isRepeatable": false,
              "args": null
            }
          ]
        }
      ]
    },
    {
      "name": [
        "tasks",
        "t"
      ],
      "description": "[experimental] Manage tasks",
      "subcommands": [
        {
          "name": [
            "deps"
          ],
          "description": "[experimental] Display a tree visualization of a dependency graph",
          "options": [
            {
              "name": [
                "--hidden"
              ],
              "description": "Show hidden tasks",
              "isRepeatable": false,
              "args": null
            },
            {
              "name": [
                "--dot"
              ],
              "description": "Display dependencies in DOT format",
              "isRepeatable": false,
              "args": null
            }
          ],
          "args": [
            {
              "name": "tasks",
              "isOptional": true,
              "isVariadic": true
            }
          ]
        },
        {
          "name": [
            "edit"
          ],
          "description": "[experimental] Edit a tasks with $EDITOR",
          "options": [
            {
              "name": [
                "-p",
                "--path"
              ],
              "description": "Display the path to the tasks instead of editing it",
              "isRepeatable": false,
              "args": null
            }
          ],
          "args": [
            {
              "name": "task",
              "isOptional": false,
              "isVariadic": false
            }
          ]
        },
        {
          "name": [
            "info"
          ],
          "description": "[experimental] Get information about a task",
          "options": [
            {
              "name": [
                "-J",
                "--json"
              ],
              "description": "Output in JSON format",
              "isRepeatable": false,
              "args": null
            }
          ],
          "args": [
            {
              "name": "task",
              "isOptional": false,
              "isVariadic": false
            }
          ]
        },
        {
          "name": [
            "ls"
          ],
          "description": "[experimental] List available tasks to execute\nThese may be included from the config file or from the project's .mise/tasks directory\nmise will merge all tasks from all parent directories into this list.",
          "options": [
            {
              "name": [
                "--no-header"
              ],
              "description": "Do not print table header",
              "isRepeatable": false,
              "args": null
            },
            {
              "name": [
                "-x",
                "--extended"
              ],
              "description": "Show all columns",
              "isRepeatable": false,
              "args": null
            },
            {
              "name": [
                "--hidden"
              ],
              "description": "Show hidden tasks",
              "isRepeatable": false,
              "args": null
            },
            {
              "name": [
                "--sort"
              ],
              "description": "Sort by column. Default is name.",
              "isRepeatable": false,
              "args": {
                "name": "column",
                "isOptional": false,
                "isVariadic": false
              }
            },
            {
              "name": [
                "--sort-order"
              ],
              "description": "Sort order. Default is asc.",
              "isRepeatable": false,
              "args": {
                "name": "sort_order",
                "isOptional": false,
                "isVariadic": false
              }
            },
            {
              "name": [
                "-J",
                "--json"
              ],
              "description": "Output in JSON format",
              "isRepeatable": false,
              "args": null
            }
          ]
        },
        {
          "name": [
            "run",
            "r"
          ],
          "description": "[experimental] Run task(s)",
          "options": [
            {
              "name": [
                "-C",
                "--cd"
              ],
              "description": "Change to this directory before executing the command",
              "isRepeatable": false,
              "args": {
                "name": "cd",
                "isOptional": false,
                "isVariadic": false
              }
            },
            {
              "name": [
                "-n",
                "--dry-run"
              ],
              "description": "Don't actually run the tasks(s), just print them in order of execution",
              "isRepeatable": false,
              "args": null
            },
            {
              "name": [
                "-f",
                "--force"
              ],
              "description": "Force the tasks to run even if outputs are up to date",
              "isRepeatable": false,
              "args": null
            },
            {
              "name": [
                "-p",
                "--prefix"
              ],
              "description": "Print stdout/stderr by line, prefixed with the tasks's label\nDefaults to true if --jobs > 1\nConfigure with `task_output` config or `MISE_TASK_OUTPUT` env var",
              "isRepeatable": false,
              "args": null
            },
            {
              "name": [
                "-i",
                "--interleave"
              ],
              "description": "Print directly to stdout/stderr instead of by line\nDefaults to true if --jobs == 1\nConfigure with `task_output` config or `MISE_TASK_OUTPUT` env var",
              "isRepeatable": false,
              "args": null
            },
            {
              "name": [
                "-t",
                "--tool"
              ],
              "description": "Tool(s) to also add e.g.: node@20 python@3.10",
              "isRepeatable": true,
              "args": {
                "name": "tool@version",
                "isOptional": false,
                "isVariadic": false
              }
            },
            {
              "name": [
                "-j",
                "--jobs"
              ],
              "description": "Number of tasks to run in parallel\n[default: 4]\nConfigure with `jobs` config or `MISE_JOBS` env var",
              "isRepeatable": false,
              "args": {
                "name": "jobs",
                "isOptional": false,
                "isVariadic": false
              }
            },
            {
              "name": [
                "-r",
                "--raw"
              ],
              "description": "Read/write directly to stdin/stdout/stderr instead of by line\nConfigure with `raw` config or `MISE_RAW` env var",
              "isRepeatable": false,
              "args": null
            },
            {
              "name": [
                "--timings"
              ],
              "description": "Shows elapsed time after each tasks",
              "isRepeatable": false,
              "args": null
            }
          ],
          "args": [
            {
              "name": "task",
              "isOptional": true,
              "isVariadic": false
            },
            {
              "name": "args",
              "isOptional": true,
              "isVariadic": true
            }
          ]
        }
      ],
      "options": [
        {
          "name": [
            "--no-header"
          ],
          "description": "Do not print table header",
          "isRepeatable": false,
          "args": null
        },
        {
          "name": [
            "-x",
            "--extended"
          ],
          "description": "Show all columns",
          "isRepeatable": false,
          "args": null
        },
        {
          "name": [
            "--hidden"
          ],
          "description": "Show hidden tasks",
          "isRepeatable": false,
          "args": null
        },
        {
          "name": [
            "--sort"
          ],
          "description": "Sort by column. Default is name.",
          "isRepeatable": false,
          "args": {
            "name": "column",
            "isOptional": false,
            "isVariadic": false
          }
        },
        {
          "name": [
            "--sort-order"
          ],
          "description": "Sort order. Default is asc.",
          "isRepeatable": false,
          "args": {
            "name": "sort_order",
            "isOptional": false,
            "isVariadic": false
          }
        },
        {
          "name": [
            "-J",
            "--json"
          ],
          "description": "Output in JSON format",
          "isRepeatable": false,
          "args": null
        }
      ]
    },
    {
      "name": [
        "trust"
      ],
      "description": "Marks a config file as trusted",
      "options": [
        {
          "name": [
            "-a",
            "--all"
          ],
          "description": "Trust all config files in the current directory and its parents",
          "isRepeatable": false,
          "args": null
        },
        {
          "name": [
            "--untrust"
          ],
          "description": "No longer trust this config",
          "isRepeatable": false,
          "args": null
        },
        {
          "name": [
            "--show"
          ],
          "description": "Show the trusted status of config files from the current directory and its parents.\nDoes not trust or untrust any files.",
          "isRepeatable": false,
          "args": null
        }
      ],
      "args": [
        {
          "name": "config_file",
          "isOptional": true,
          "isVariadic": false,
          "template": "filepaths"
        }
      ]
    },
    {
      "name": [
        "uninstall",
        "remove",
        "rm"
      ],
      "description": "Removes installed tool versions",
      "options": [
        {
          "name": [
            "-a",
            "--all"
          ],
          "description": "Delete all installed versions",
          "isRepeatable": false,
          "args": null
        },
        {
          "name": [
            "-n",
            "--dry-run"
          ],
          "description": "Do not actually delete anything",
          "isRepeatable": false,
          "args": null
        }
      ],
      "args": [
        {
          "name": "installed_tool@version",
          "isOptional": true,
          "isVariadic": true
        }
      ]
    },
    {
      "name": [
        "unset"
      ],
      "description": "Remove environment variable(s) from the config file.",
      "options": [
        {
          "name": [
            "-f",
            "--file"
          ],
          "description": "Specify a file to use instead of `mise.toml`",
          "isRepeatable": false,
          "args": {
            "name": "file",
            "isOptional": false,
            "isVariadic": false,
            "template": "filepaths"
          }
        },
        {
          "name": [
            "-g",
            "--global"
          ],
          "description": "Use the global config file",
          "isRepeatable": false,
          "args": null
        }
      ],
      "args": [
        {
          "name": "keys",
          "isOptional": true,
          "isVariadic": true
        }
      ]
    },
    {
      "name": [
        "upgrade",
        "up"
      ],
      "description": "Upgrades outdated tools",
      "options": [
        {
          "name": [
            "-n",
            "--dry-run"
          ],
          "description": "Just print what would be done, don't actually do it",
          "isRepeatable": false,
          "args": null
        },
        {
          "name": [
            "-i",
            "--interactive"
          ],
          "description": "Display multiselect menu to choose which tools to upgrade",
          "isRepeatable": false,
          "args": null
        },
        {
          "name": [
            "-j",
            "--jobs"
          ],
          "description": "Number of jobs to run in parallel\n[default: 4]",
          "isRepeatable": false,
          "args": {
            "name": "jobs",
            "isOptional": false,
            "isVariadic": false
          }
        },
        {
          "name": [
            "-l",
            "--bump"
          ],
          "description": "Upgrades to the latest version available, bumping the version in mise.toml",
          "isRepeatable": false,
          "args": null
        },
        {
          "name": [
            "--raw"
          ],
          "description": "Directly pipe stdin/stdout/stderr from plugin to user Sets --jobs=1",
          "isRepeatable": false,
          "args": null
        }
      ],
      "args": [
        {
          "name": "tool@version",
          "isOptional": true,
          "isVariadic": true
        }
      ]
    },
    {
      "name": [
        "use",
        "u"
      ],
      "description": "Installs a tool and adds the version it to mise.toml.",
      "options": [
        {
          "name": [
            "-f",
            "--force"
          ],
          "description": "Force reinstall even if already installed",
          "isRepeatable": false,
          "args": null
        },
        {
          "name": [
            "--fuzzy"
          ],
          "description": "Save fuzzy version to config file",
          "isRepeatable": false,
          "args": null
        },
        {
          "name": [
            "-g",
            "--global"
          ],
          "description": "Use the global config file (`~/.config/mise/config.toml`) instead of the local one",
          "isRepeatable": false,
          "args": null
        },
        {
          "name": [
            "-e",
            "--env"
          ],
          "description": "Modify an environment-specific config file like .mise.<env>.toml",
          "isRepeatable": false,
          "args": {
            "name": "env",
            "isOptional": false,
            "isVariadic": false
          }
        },
        {
          "name": [
            "-j",
            "--jobs"
          ],
          "description": "Number of jobs to run in parallel\n[default: 4]",
          "isRepeatable": false,
          "args": {
            "name": "jobs",
            "isOptional": false,
            "isVariadic": false
          }
        },
        {
          "name": [
            "--raw"
          ],
          "description": "Directly pipe stdin/stdout/stderr from plugin to user Sets `--jobs=1`",
          "isRepeatable": false,
          "args": null
        },
        {
          "name": [
            "--remove"
          ],
          "description": "Remove the plugin(s) from config file",
          "isRepeatable": true,
          "args": {
            "name": "plugin",
            "isOptional": false,
            "isVariadic": false
          }
        },
        {
          "name": [
            "-p",
            "--path"
          ],
          "description": "Specify a path to a config file or directory",
          "isRepeatable": false,
          "args": {
            "name": "path",
            "isOptional": false,
            "isVariadic": false,
            "template": "filepaths"
          }
        },
        {
          "name": [
            "--pin"
          ],
          "description": "Save exact version to config file\ne.g.: `mise use --pin node@20` will save 20.0.0 as the version\nSet `MISE_PIN=1` or `MISE_ASDF_COMPAT=1` to make this the default behavior",
          "isRepeatable": false,
          "args": null
        }
      ],
      "args": [
        {
          "name": "tool@version",
          "isOptional": true,
          "isVariadic": true
        }
      ]
    },
    {
      "name": [
        "version",
        "v"
      ],
      "description": "Display the version of mise"
    },
    {
      "name": [
        "watch",
        "w"
      ],
      "description": "[experimental] Run task(s) and watch for changes to rerun it",
      "options": [
        {
          "name": [
            "-t",
            "--task"
          ],
          "description": "Tasks to run",
          "isRepeatable": true,
          "args": {
            "name": "task",
            "isOptional": false,
            "isVariadic": false
          }
        },
        {
          "name": [
            "-g",
            "--glob"
          ],
          "description": "Files to watch\nDefaults to sources from the tasks(s)",
          "isRepeatable": true,
          "args": {
            "name": "glob",
            "isOptional": false,
            "isVariadic": false
          }
        }
      ],
      "args": [
        {
          "name": "args",
          "isOptional": true,
          "isVariadic": true
        }
      ]
    },
    {
      "name": [
        "where"
      ],
      "description": "Display the installation path for a tool",
      "args": [
        {
          "name": "tool@version",
          "isOptional": false,
          "isVariadic": false
        }
      ]
    },
    {
      "name": [
        "which"
      ],
      "description": "Shows the path that a tool's bin points to.",
      "options": [
        {
          "name": [
            "--plugin"
          ],
          "description": "Show the plugin name instead of the path",
          "isRepeatable": false,
          "args": null
        },
        {
          "name": [
            "--version"
          ],
          "description": "Show the version instead of the path",
          "isRepeatable": false,
          "args": null
        },
        {
          "name": [
            "-t",
            "--tool"
          ],
          "description": "Use a specific tool@version\ne.g.: `mise which npm --tool=node@20`",
          "isRepeatable": false,
          "args": {
            "name": "tool@version",
            "isOptional": false,
            "isVariadic": false
          }
        }
      ],
      "args": [
        {
          "name": "bin_name",
          "isOptional": false,
          "isVariadic": false
        }
      ]
    }
  ],
  "options": [
    {
      "name": [
        "-C",
        "--cd"
      ],
      "description": "Change directory before running command",
      "isRepeatable": false,
      "args": {
        "name": "dir",
        "isOptional": false,
        "isVariadic": false,
        "template": "folders"
      }
    },
    {
      "name": [
        "-P",
        "--profile"
      ],
      "description": "Set the profile (environment)",
      "isRepeatable": false,
      "args": {
        "name": "profile",
        "isOptional": false,
        "isVariadic": false,
        "template": "filepaths"
      }
    },
    {
      "name": [
        "-q",
        "--quiet"
      ],
      "description": "Suppress non-error messages",
      "isRepeatable": false,
      "args": null
    },
    {
      "name": [
        "-v",
        "--verbose"
      ],
      "description": "Show extra output (use -vv for even more)",
      "isRepeatable": true,
      "args": null
    },
    {
      "name": [
        "-y",
        "--yes"
      ],
      "description": "Answer yes to all confirmation prompts",
      "isRepeatable": false,
      "args": null
    }
  ]
}

export default completionSpec;
