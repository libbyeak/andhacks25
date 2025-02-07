---
title: "Automate macOS setup with a brewfile"
description:
  'Foto de <a class="underline" href="https://unsplash.com/es/@adrigeo_?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Adrianna Geo</a> en <a href="https://unsplash.com/es/fotos/una-pintura-en-el-techo-de-un-edificio-1rBg5YSi00c?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash" class="underline">Unsplash</a>
  '
icon: "1"
pubDate: "2021-12-25"
heroImage: "/src/assets/laptop.jpeg"
tags: ["tutorial"]
---

One of the best things I learned from my very first Engineering manger was how to easily setup a new mac in about 5-10 mins using Homebrew and a brewfile.

Homebrew is a package manager for macOS. It allows you to easily install software and applications from your terminal and makes setting up a new mac a breeze. Follow the steps below to automate your macOS config so you never have to remember your favorite apps again.

**Step 1:** install Homebrew

Open up your terminal and paste the following command:

```
$ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

This step will take a few mins to complete so feel free to make a sandwich while you wait 😊

**Step** 2: Create a new brewfile

On your machine, create a file called Brewfile and add your packages, software and applications you want to install.

If you don't know how to create one, take a look at mine here: [https://github.com/LadyKerr/BrewFile/blob/main/brewfile.sh](https://github.com/LadyKerr/BrewFile/blob/main/brewfile.sh "brewfile on LadyKerr's github") .

Be sure to include this command in your file:

```
$ brew tap Homebrew/bundle
```

If you have an older mac that's configured the way you enjoy, install homebrew on your old machine and run the following command in your terminal:

```
$ brew bundle dump
```

This will generate a brewfile with all your apps, software and packages. You can then import that brewfile to your new machine.

**Step 3:** install your applications

`cd` into the location of your brewfile in your terminal and run the following command:

```
$ brew bundle
```

Now sit back and let homebrew work its magic. In only a few mins you'll have all your applications, software and packages downloaded on your machine. If everything runs without error, you're good to go 💃🏽.

Once this is complete, take it a step further and customize your terminal!

Install iterm2, zsh and oh-my-zsh to have a truly custom experience.

I like instructions in this tutorial: [https://chamikakasun.medium.com/iterm2-zsh-oh-my-zsh-the-most-power-full-terminal-on-macos-2021-guide-macos-big-sur-5bb498976dc9](https://chamikakasun.medium.com/iterm2-zsh-oh-my-zsh-the-most-power-full-terminal-on-macos-2021-guide-macos-big-sur-5bb498976dc9 "install zsh iterm and oh-myzsh") .

Happy coding friends!

Kedasha 😊