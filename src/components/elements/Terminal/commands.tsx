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
    command: "cat",
    description: "display contents of a file to the terminal",
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
    command: "code",
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

export const getResponse = (line: string) => {
  const command = line.trim().split(" ")[0];
  const args = line.trim().split(" ").slice(1);
  switch (command) {
    case "help":
      return (
        <div className="font-mono text-terminal">
          <div>ZSH version 6.9.0 (x86_64-apple-darwin20.3.0)</div>
          <div>These shell commands are defined internally.</div>
          {/* <div>
            Type <span className="text-cyan-500">'help'</span> to see this list.
          </div> */}
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
    case "uname":
      return (
        <div className="font-mono text-terminal">
          <div>
            Darwin avp1598.local 20.3.0 Darwin Kernel Version 20.3.0: Thu Jan 21
            00:07:06 PST 2021; root:xnu-7195.81.3~1/RELEASE_X86_64 x86_64
          </div>
        </div>
      );
    case "whoami":
      return (
        <div className="font-mono text-terminal">
          <div>Aditya Veer Parmar</div>
        </div>
      );
    case "ls":
      if (args.length) {
        return (
          <div className="font-mono text-terminal">
            ls: cannot access <span className="text-cyan-500">{args[0]}</span>{" "}
            Permission denied
          </div>
        );
      }
      return (
        <div className="font-mono text-terminal flex gap-4 items-center">
          <a
            className="bg-terminal text-slate-800"
            href="https://github.com/avp1598"
            target="_blank"
            aria-label="GitHub"
          >
            .github
          </a>
          <a
            className="bg-terminal text-slate-800"
            href="https://github.com/avp1598/avp1598.dev"
            target="_blank"
            aria-label="GitHub"
          >
            src
          </a>
          <div className="text-cyan-500">README.md</div>
          <div className="text-cyan-500">resume.sh</div>
          <div className="text-cyan-500">contact.ts</div>
        </div>
      );
    case "cd":
      if (args.length) {
        switch (args[0]) {
          case "README.md":
          case "resume.sh":
          case "contact.ts":
            return (
              <div className="font-mono text-terminal">
                zsh: cd: <span className="text-cyan-500">{args[0]}</span>: Not a
                directory
              </div>
            );
          case ".github":
            window.open("https://github.com/avp1598", "_blank");
            return (
              <div className="font-mono text-terminal">
                Opening <span className="text-cyan-500">{args[0]}</span>...
              </div>
            );
          case "src":
            window.open("https://github.com/avp1598", "_blank");
            return (
              <div className="font-mono text-terminal">
                Opening <span className="text-cyan-500">{args[0]}</span>...
              </div>
            );
          default:
            return (
              <div className="font-mono text-terminal">
                cd: cannot access{" "}
                <span className="text-cyan-500">{args[0]}</span>: Permission
                denied
              </div>
            );
        }
      }
      return <div />;
    case "cat":
      if (args.length) {
        switch (args[0]) {
          case "README.md":
            return (
              <div className="font-mono text-terminal">
                Hi, I'm Aditya Veer Parmar
                <br />
                <br />
                I'm a full stack software engineer with 5 years of experience.
                <br />
                <br />
                I'm currently working with{" "}
                <a href="https://tribes.xyz" aria-label="tribes">
                  <span className="text-cyan-500">Tribes.xyz</span>
                </a>
                .
                <br />
                <br />I love working on new technologies and building cool stuff
                from scratch (like this portfolio).
                <br />
                <br />
              </div>
            );
          case "resume.sh":
            return () => {
              location.href = "/resume";
              return <div />;
            };
          case "contact.ts":
            return () => {
              location.href = "/contact";
              return <div />;
            };
          case ".github":
          case "src":
            return (
              <div className="font-mono text-terminal">
                zsh: cat: <span className="text-cyan-500">{args[0]}</span>: Is a
                directory
              </div>
            );
          default:
            return (
              <div className="font-mono text-terminal">
                zsh: cat: <span className="text-cyan-500">{args[0]}</span>: No
                such file or directory
              </div>
            );
        }
      }
      return <div />;

    case "resume.sh":
    case "./resume.sh":
    case "resume":
      return () => {
        location.href = "/resume";
        return <div />;
      };
    case "contact.ts":
    case "./contact.ts":
    case "contact":
      return () => {
        location.href = "/contact";
        return <div />;
      };
    case "code":
      return () => {
        location.href = "/code";
        return <div />;
      };

    default:
      return (
        <div className="font-mono text-terminal">
          zsh: Command not found:{" "}
          <span className="text-cyan-500">{command}</span>
        </div>
      );
  }
};
