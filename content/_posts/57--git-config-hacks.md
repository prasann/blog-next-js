---
title: My productivity hacks - gitconfig
description: Summarizing some of the configuration that i like and follow in managing my git repositories. 
category: tech, git
date: 10-08-2022
minutesToRead: 5
---

There are zillions of [git-configs](https://git-scm.com/docs/git-config) present, and certainly, all of us have our favorites. Here are some of the configs that I use currently. I use GitHub (private repo) and manually synchronize these git-configs (and other configs) across devices.

### Folder level configuration

This is one of the handy features that was introduced in git 2.13. 
I usually have a root level folder for `personal` and `work` separately. Within work, there could be multiple `clients` directory. Each of these directories will have its `.gitconfig`-{personal/work/client}` file within it. These directory level gitconfig can contain any valid git-config and will be used to override the global ones at the directory level. 

A sample from my work level git-config

```git
[user]
    name = Prasanna
    email = work-email
    signingkey = gpg-key-for-work-email
```

For the overrides to work, I need to add the following

```git
[includeIf "gitdir:~/projects/work/"]
    path = ~/projects/work/.gitconfig-work
```
**Pro tips in managing the folder level configs**
1. **End `gitdir` with a `/`:** The `gitdir` should end with a `/` otherwise the config won't be picked up inside the directory.
2. **Config will work only within a git repo:** 
In my case `~/projects/work` isn't a git repo. so if i check for `git config user.email` it will be the one defined globally. However, i have git repos as subfolder `~/projects/work/proj-a` inside these git repos the email i configured in `.gitconfig-work` will take effect.

### alias

`empty` - shortcut to create git empty commits.
`delete-local-merged` - I like to keep my local branches clean. this will delete the branches that are merged with `main`

```git
[alias]
    empty = "git commit --allow-empty"
    delete-local-merged = "!git fetch && git branch --merged | egrep -v 'main' | xargs git branch -d"
```

### editor

setup the git's default editor to `vscode`. 

```git
[core]
	editor = code --wait
```

### push style

`push.default` strategy to `current`. this push the current branch to update a branch with the same name on the receiving end. 

```git
[push]
	default = current
```

### prune true

Git has a default disposition of keeping data unless it’s explicitly thrown away; this extends to holding onto local references to branches on remotes that have themselves deleted those branches.

setting `fetch.prune` to true, it will remove the local branch if the remote is deleted.

```git
[fetch]
    prune = true
```

### autocorrect

autocorrects a single typo. ex: `stats` to `status`

```git
[help]
	autocorrect = 1
```

### signing commits

I like to have the small green tick in github. We can get verify the commit using gpg keys. [Read more on github](https://docs.github.com/en/authentication/managing-commit-signature-verification/about-commit-signature-verification)

I maintain gpg keys separately for my work email and personal email. So the signing key gets overriden at directory level.

```git
[commit]
	gpgsign = true
```

this will mandate the commits to be signed.

```git
[user]
    name = Prasanna
    email = mail.prasanna.v@gmail.com
	signingkey = <GPG Key Signature>
```

These are on my list for a while now. And i keep experimenting with new configs as i read along.
