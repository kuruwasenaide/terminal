const terminal = document.getElementById('terminal');

        const commands = {
            help: function() {
                return `available commands:
- help: show this help menu
- clear: clear the terminal
- portfolio: show my portfolio
- bg: toggle background image
- qrcode [link]: generate a qrcode for your link`;

            },
            clear: function() {
                terminal.innerHTML = '';
                return '';
            },
            portfolio: function() {
                // const img = document.createElement('img')
                // img.src = `../img/pic.png`
                // img.className = 'terminal-image'
                // terminal.appendChild(img)
                return `hello! i'm kauê moreira, a 17 years old passionate computer science student with a keen interest in web development, software engineering, and artificial intelligence.
i love building things that live on the internet and constantly explore new technologies to solve real-world problems.

languages: [c++] [html] [css] [javascript]
speciality: back-end

type 'contact' to get in touch or 'projects' to see my github`  
            },

            projects: function() {
                window.open('https://github.com/kuruwasenaide', '_blank')
                return ''
            },

            contact: function() {
                createLinkLine('mailto:ykmoreira@gmail.com', 'email')
                createLinkLine('https://wa.me/5587991174472', 'whatsapp')
                createCopyLine('k_ue', 'discord')
                return ''
            },

            bg: function() {
                let itemValue = (localStorage.getItem('bg') === 'true')
                localStorage.setItem('bg', !itemValue )
                
                if(!itemValue)
                    document.getElementById('terminal-background').innerHTML = '<img id="background-logo" src="img/ico.png">'
                else
                    document.getElementById('terminal-background').innerHTML = ''

                return ''
            },

            qrcode: function(args) {
                if (args.join(0)){
                    const qrcode = document.createElement('img');
                    qrcode.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${args}`
                    qrcode.className = 'terminal-qr'
                    terminal.appendChild(qrcode)
                    
                    qrcode.addEventListener('click', () => {
                        if(args.join(0).includes('https'))
                            window.open(`${args}`, '_blank');
                        else
                            window.open(`https://${args}`, '_blank');

                    });

                    return `${args}`
                }
                else {
                    return 'no link avaiable'
                }   
            },
        };

        function bgCheck() {
            if(!localStorage.getItem('bg'))
                localStorage.setItem('bg', true );

            let iV = (localStorage.getItem('bg') === 'true')
            if(iV)
                document.getElementById('terminal-background').innerHTML = '<img id="background-logo" src="img/ico.png">'
            else
                document.getElementById('terminal-background').innerHTML = ''
        }

        function createLinkLine(url, text) {
            const linkDiv = document.createElement('div');
            const linkSpan = document.createElement('span');
            linkSpan.className = 'clickable-link';
            linkSpan.textContent = '> ' + text;

            linkSpan.addEventListener('click', () => {
                window.open(url, '_blank');
            });

            linkDiv.appendChild(linkSpan);
            terminal.appendChild(linkDiv);
        }

        function createCopyLine(context, text) {
                const copyDiv = document.createElement('div');
                const copySpan = document.createElement('span');
                copySpan.className = 'copyable-text';
                copySpan.textContent = '> ' + text;
                
                const feedbackSpan = document.createElement('span');
                feedbackSpan.className = 'copy-feedback';

                copySpan.addEventListener('click', () => {
                    const tempTextArea = document.createElement('textarea');
                    tempTextArea.value = context;
                    document.body.appendChild(tempTextArea);
                    tempTextArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(tempTextArea);

                    feedbackSpan.textContent = '[copied!]';
                    setTimeout(() => {
                        feedbackSpan.textContent = '';
                    }, 3000);                });

                copyDiv.appendChild(copySpan);
                copyDiv.appendChild(feedbackSpan);
                terminal.appendChild(copyDiv);
        }

        function createCommandLine() {
            const commandLineDiv = document.createElement('div');
            commandLineDiv.className = 'command-line';

            const commandInput = document.createElement('input');
            commandInput.type = 'text';
            commandInput.id = 'command-input';
            commandInput.placeholder = 'type your command here...';

            commandInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    const fullCommand = this.value.trim();
                    const [cmd, ...args] = fullCommand.split(' ');

                    // display
                    const commandOutput = document.createElement('div');
                    commandOutput.textContent = `> ${fullCommand}`;
                    commandOutput.className = 'user-command';
                    terminal.appendChild(commandOutput);

                    // process
                    let output;
                    if (commands[cmd]) {
                        output = commands[cmd](args);
                        if (output) {
                            const outputDiv = document.createElement('div');
                            outputDiv.textContent = output;
                            outputDiv.className = 'system-output';
                            terminal.appendChild(outputDiv);
                        }
                    } else {
                        const errorDiv = document.createElement('div');
                        errorDiv.textContent = `command not found: ${cmd}`;
                        errorDiv.className = 'error-output';
                        terminal.appendChild(errorDiv);
                    }
                    commandLineDiv.remove();
                    createCommandLine();
                }
            });

            commandLineDiv.appendChild(commandInput);
            terminal.appendChild(commandLineDiv);

            commandInput.focus();
        }

        const welcomeDiv1 = document.createElement('div');
        welcomeDiv1.textContent = 'welcome to terminal';1
        welcomeDiv1.className = 'system-output';
        terminal.appendChild(welcomeDiv1);

        const welcomeDiv2 = document.createElement('div');
        welcomeDiv2.textContent = `type 'help' to see available commands`;
        welcomeDiv2.className = 'system-output';
        terminal.appendChild(welcomeDiv2);

        createCommandLine();
        document.getElementById('terminal-background').innerHTML = ''

        window.onload = function(){
            bgCheck()
        }