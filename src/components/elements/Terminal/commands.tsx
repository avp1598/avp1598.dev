export const CommandList = [
  {
    command: "ls",
    description: "list directory contents",
  },
  {
    command: "cd",
    description: "changes the current working directory",
  },
  {
    command: "clear",
    description: "clears the terminal",
  },
  {
    command: "resume",
    description: "view my resume",
  },
  {
    command: "contact",
    description: "get in touch with me",
  },
  {
    command: "projects",
    description: "view my projects",
  },
  {
    command: "code .",
    description: "open a new VS Code window",
  },
  {
    command: "help",
    description: "list all available commands",
  },
  {
    command: "uname",
    description: "print system information",
  },
  {
    command: "whoami",
    description: "prints the full name of the current user",
  },
];

export const getResponse = (command: string) => {
  switch (command) {
    case "help":
      return (
        <div className="font-mono text-terminal">
          <div>ZSH version 6.9.0 (x86_64-apple-darwin20.3.0)</div>
          <div>These shell commands are defined internally.</div>
          <div>
            Type <span className="text-cyan-500">'help'</span> to see this list.
          </div>
          <div className="mt-6">
            {CommandList.map((cmd) => (
              <div key={cmd.command} className="flex w-full">
                <span className="text-cyan-500 w-1/3">{cmd.command}</span>
                <span className="ml-2 w-2/3">{cmd.description}</span>
              </div>
            ))}
          </div>
        </div>
      );
    default:
      return (
        <div className="font-mono text-terminal">
          zsh: Command not found:{" "}
          <span className="text-cyan-500">{command}</span>
        </div>
      );
  }
};
