#!/bin/env zsh

# newuser module: zsh-newuser-install
newuser(){
  autoload -Uz zsh-newuser-install
  zsh-newuser-install -f
}

# man zshoptions: for detailed zsh options
# setopt: set options
# unsetopt: unset options

# man zshbuiltins: for detailed zsh builtins

# startup config files
# /etc/zshenv , ~/.zshenv : every shell
# /etc/zprofile , ~/.zprofile : interactive login shell
# /etc/zshrc , ~/.zshrc : interactive non-login shell
# /etc/zlogin , ~/.zlogin : login shell
# /etc/zlogout , ~/.zlogout : every shell
# unset RCS # disables loading of files other than zshenv
# unset GLOBAL_RCS # disables loading of files under /etc/

# prompt themes
# autoload -Uz promptinit
# promptinit
# prompt -p 
# print -l $fpath

# alias 
# alias -L
# alias ll='ls -l'

# call original command
# command ls
# 'ls'
# \ls
# /usr/bin/ls
# =ls

# global aliases
# alias -g L='| less'
# alias -g G='| grep'
# alias -g NUL="> /dev/null 2>&1"
# alias rand='echo $(( ( RANDOM % 10 ) + 1 ))'
# alias mkdir='mkdir -pv'
# alias cd='cd "$@" && ls -A'
# alias ...='cd ../..'
# Eg. ls -l L

# directory aliases
# hash -d myproj=$HOME/projects/myproj
# cd ~myproj

# autocd : to cd into a directory without cd command
# setopt autocd


# parameter expansions: echo "var is: ${var}"
# command substitution: echo "Today is $(date)", echo "Today is `date`"
# arithmetic expansion: echo "2 + 2 = $((2+2))"
# addfive=5+ ; echo "2 + 2 + 5 = $(( $addfive 2))"
# echo ${(q)string} : prints the raw string

# brace expansion: echo {1..10}, echo {a..z}, echo {1..10..2}
# touch log_00{1,2,3}.txt
# echo {1..${#foo[@]}}
# foo=(A B C)
# bar=(1 2 3)
# echo $^foo-$^bar : A-1 A-2 A-3 B-1 B-2 B-3 C-1 C-2 C-3, 
# echo $foo-$bar : A-1 B-2 C-3
# echo ${foo[@]}-${bar[@]} : A B C-1 2 3
# ^ expands the array elements

# man zshexpn: for detailed expansion options

# setopt HIST_VERIFY : to verify history expansion before execution
# history expansion: echo !!
# echo !-1
# echo !-2:gs/i/I : replaces i with I in last command
# echo !-2:gs/i/I:p : prints the command
# echo !$ : expands last argument of previous command
# echo !* : expands all arguments of previous command
# echo !^ : expands first argument of previous command
# echo !:1-2 : expands first and second argument of previous command
# echo !:1-$ : expands first to last argument of previous command
# echo !cp : expands last command starting with cp
# % -> !%, !:%, or !?str?:%;
# echo !?str?:%; : expands last command containing str
# ^fiel^file : replaces first occurence of fiel with file in last command

# process substitution: diff <(ls dir1) <(ls dir2)


# globbing
# setopt nocaseglob : to ignore case
# setopt null_glob : to ignore unmatched glob
# setopt extended_glob : to enable extended globbing
# echo * : expands to all files in current directory
# echo ** : expands to all files in current directory and subdirectories. Needs extended_glob
# echo *.txt : expands to all files ending with .txt
# echo *.(txt|md) : expands to all files ending with .txt or .md
# echo *.(#i)txt : expands to all files ending with .txt ignoring case
# echo main.{c,h} : expands to main.c and main.h
# echo {main,lib}.{c,h} : expands to main.c main.h lib.c lib.h
# echo main.? : expands to 'main.' followed by any character
# echo *.log_[1-9] : expands to all files ending with .log_1 to .log_9
# echo log-<->.txt : expands to all files starting with log- followed by any number
# echo log-<1-9>.txt : expands to all files starting with log- followed by any number from 1 to 9
# echo log-<1-9->.txt : expands to all files starting with log- followed by any number from 1 to 9 and ending with any number
# echo log-<10->.txt : expands to all files starting with log- followed by 10 and ending with any number
# echo *.[^o] : expands to all files ending with any character except o
# echo b^*.o : expands to all files starting with b and not ending with .o
# echo b*~*.o : expands to all files starting with b and not ending with .o. ~ separates two pattern, matchpattern~avoidpattern

# glob qualifiers
# Eg. echo *(.) : expands to all regular files
# (N): Remove argument if no matches are found, silently ignore errors. Acts as a per-command NO_GLOB option.
# (@): Symlink qualifier. Used for only selecting symbolic links.
# (-@): A special variation of the previous one. Use this to find any broken symlinks.
# (/): Directories only.
# (.): Files only. Whatever is not either a link, directory, or any of the previous
#ill be selected by this.
# (*): Executable files. Directories need not apply. Think of this as (.) for
#hose files with +x permissions.
# (r): File is readable by the current shell user.
# (w): File is writable by the current shell user.
# (x): File is executable by the current shell user.
# (U): File is owned by the current shell user.
# (R): File is readable by anyone.
# (W): File is writable by anyone.
# (X): File is executable by anyone.
# (u:root:): File is owned by the user root. You can replace the : character with any another pair of symbols such as curly braces: (u{root}). Just refrain from using pipes (|).
# (on): Sort filenames by name. The echo *(on) construct will be analogous to ls.
# (On): Reverse-sort filenames by name.
# (oL): Sort filenames by file size.
# (OL): Reverse-sort filenames by file size.
# (om): Sort filenames by modification date.
# (Om): Reverse-sort filenames by modification date.
# (mh-1): Select files modified more than an hour ago.
# (ah+1): Select files accessed in the last hour
# (m-5mh+2): Select files modified between 5 hours and 2 hours.
# (Lm+5): Select files greater than 5mb
# (Lk-5): Select files less than 5kb

# character classes
# echo [[:upper:]]* : expands to all files starting with uppercase letter
# echo [[:lower:]]* : expands to all files starting with lowercase letter
# echo [[:alpha:]]* : expands to all files starting with letter
# echo [[:alnum:]]* : expands to all files starting with letter or number
# echo [[:digit:]]* : expands to all files starting with number
# echo [[:xdigit:]]* : expands to all files starting with hexadecimal number
# echo [[:punct:]]* : expands to all files starting with punctuation
# echo [[:print:]]* : expands to all files starting with printable character
# echo [[:space:]]* : expands to all files starting with whitespace
# echo [[:blank:]]* : expands to all files starting with blank character
# echo [[:cntrl:]]* : expands to all files starting with control character
# echo [[:graph:]]* : expands to all files starting with graphical character
# echo [[:word:]]* : expands to all files starting with word character
# echo [[:ascii:]]* : expands to all files starting with ascii character


# zmv function
# autoload -Uz zmv
# zmv -Wv '(*).txt' '$1.md' : rename all files ending with .txt to .md
# zmv -n '(*).txt' '$1.md' : dry run


# zargs function
# zargs -n 2 echo : prints arguments in groups of 2

# auto completion
# autoload -Uz compinit
# compinit
# autoload -Uz bashcompinit
# bashcompinit

# /u/bi/zs to be completed to /usr/bin/zsh.
# ls -<TAB> to be completed to list of options

# misc
# echo =<command> : prints the path of the command

# http://www.zsh.org : scripts and contributions
# http://zshwiki.org : wiki
# http://grml.org/zsh/zsh-lovers.html
# https://github.com/zsh-users
# https://github.com/robbyrussell/oh-my-zsh
# https://github.com/sorin-ionescu/prezto

