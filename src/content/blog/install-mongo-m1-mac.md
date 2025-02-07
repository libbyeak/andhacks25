---
title: 'How to Install & Run MongoDB on M1 Macs'
description:  '
        Foto de <a  class="underline" href="https://unsplash.com/es/fotos/flores-rojas-azules-y-blancas-5TK1F5VfdIk">Europeana </a> en <a  href="https://unsplash.com/es/fotos/flores-rojas-azules-y-blancas-5TK1F5VfdIk"  class="underline">Unsplash</a>
'
icon: '2'
pubDate: '2021-12-30'
heroImage: "/src/assets/mongodb.png"
tags: ["backend-development", "technology", "tutorial"]
---


MongoDB (mongo) isn’t natively supported on the M1 processors as of this writing. If you use zsh like I do, you may come across an error like this when trying to run mongo on your machine: `zsh: bad CPU type in executable: mongo`.

Gaah, that error freaked me out a little and I had to do a Google deep dive to figure out how to get mongo running on my machine. Here is what I found:

- To get mongoDB running on M1 macs, we need to use macOS’ Rosetta Translation Environment to run intel binaries.

Previous to Apple’s M1 Processors, Macs ran on the intel processor. Since many of the applications and software that we use are still running on intel, we need to use the Rosetta2 terminal to get these binaries to process.


> This explains why when I was trying to use Insomnia, I got a message telling me to install Rosetta2 - I ignored the message and didn’t use Insomnia because I had no idea who Rosetta was and why I needed her on my machine 😅


- We need to use Homebrew to install mongoDB on our machines.

As of Feb 2021, Homebrew fully supports Apple Silicon (M1 Processor) with v3.0.0. You can see the [release notes here](https://brew.sh/2021/02/05/homebrew-3.0.0 "https://brew.sh/2021/02/05/homebrew-3.0.0").

- We need to run mongo using the Rosetta2 Terminal.

Personally, I prefer using iTerm with zsh, but if I need to use a separate terminal to run the DB, so shall I do.

**Now, let's get to the installations!**

## **Step 1: Create a copy of your terminal**

Go to `finder > applications > terminal`, right click on the terminal and select `duplicate` ; this will create a new terminal for you to work with. Rename the new terminal to `Rosetta Terminal` so you don’t get confused which is which.

Now, right click on the newly renamed rosetta terminal, and click get info and select open using Rosetta this will enable the Rosetta Translation Environment we need to run intel binaries.

when you open up the new Rosetta Terminal, you will be asked to download Rosetta, select yes and don’t ignore it like I did initially 😅

## Step 2: Install mongo using Homebrew

If you don’t already have Homebrew on your machine, run this command in your terminal

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Once you have homebrew installed, you can pretty much follow the instructions on [mongo’s doc site](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/ "https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/") [](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/ "mongodb documentation site")using the Rosetta terminal . . . but why not add them here:

```
# install xcode cli
xcode-select --install

# download formulae for mongo
brew tap mongodb/brew

#install mongo
brew install mongodb-community@5.0
```

## Step 3: Now that everything is installed, we can run mongo on our machine (finally!)

To run mongo, do the following:

```
# run mongo as a macOS service
brew services start mongodb-community@5.0

# when you want to stop mongo as a service run this
brew services stop mongodb-community@5.0

# verify mongo is running; the status code should be started
brew services list

# connect and start using mongo
mongosh
```

Remember to run these commands in the **Rosetta Terminal**!

And there you have it - mongo is now running on your machine.

Happy coding!

Kedasha

**Resources:**

- [](https://www.mongodb.com/community/forums/t/zsh-bad-cpu-type-in-executable-mongo/97260)someone had same error: [https://www.mongodb.com/community/forums/t/zsh-bad-cpu-type-in-executable-mongo/97260](https://www.mongodb.com/community/forums/t/zsh-bad-cpu-type-in-executable-mongo/97260)
- [](https://www.youtube.com/watch?v=f3iFaiBGVYw)install mongo on m1: [https://www.youtube.com/watch?v=f3iFaiBGVYw](https://www.youtube.com/watch?v=f3iFaiBGVYw "https://www.youtube.com/watch?v=f3iFaiBGVYw")
- [](https://www.youtube.com/watch?v=9W8rTTE1WEA)create new rosetta terminal: [https://www.youtube.com/watch?v=9W8rTTE1WEA](https://www.youtube.com/watch?v=9W8rTTE1WEA "https://www.youtube.com/watch?v=9W8rTTE1WEA")
- Mongo's doc site: [https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/](https://www.mongodb.com/community/forums/t/zsh-bad-cpu-type-in-executable-mongo/97260 "https://www.mongodb.com/community/forums/t/zsh-bad-cpu-type-in-executable-mongo/97260")
- [](https://andyfeng.medium.com/how-to-install-and-run-mongodb-on-m1-macs-1ed57b570fb6)article I found later on: [https://andyfeng.medium.com/how-to-install-and-run-mongodb-on-m1-macs-1ed57b570fb6](https://andyfeng.medium.com/how-to-install-and-run-mongodb-on-m1-macs-1ed57b570fb6 "https://andyfeng.medium.com/how-to-install-and-run-mongodb-on-m1-macs-1ed57b570fb6")
