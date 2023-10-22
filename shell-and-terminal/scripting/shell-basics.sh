#!/bin/env bash


# Command Hierarchy
# • Alias
# • Function
# • Shell built in
# • Keyword
# • File

# use type to check the command type:
# type -a cd

## in ZSH
# whence -va cd


# get help
# man type
# info type
# help type
# man bash # bash built-in commands
# man zshbuiltins # zsh built-in commands

# command path variable

# test commadn == [ condition ]

# use of && and || and $?

# use of ; and ;;

# scripts with arguments: $#, $*, $@ 

# use of quotes: '', "", ``

# debugging scripts: set -x, set +x, set -v, set +v

# Different types of variables: local, global, environment, shell, read-only, array, associative array

# use of declare, typeset, readonly, local, export, unset

# different switches to a command
promptfun(){
  echo -n "Enter a number: "
  echo -e "\n"
  read -p "Enter a number: " num
  echo "You entered $num"
  read -p "Enter a number: "
  echo "You entered $REPLY"

  # limit the number of input characters
  read -n 2 -p "Enter a number: "

  # silent input
  read -s -p "Enter a password: "
}

# conditions
conditionsfun(){
  # test commands
  # test expression
  # [ expression ]
  # test expression -a expression
  # test expression -o expression
  # test ! expression

  test 1 -eq 1

  # test for zero bytes
  test -z "string"

  # using if 
  # same as `test 1 -eq 1 && echo "1 is equal to 1"`
  if test 1 -eq 1; then
    echo "1 is equal to 1"
  else
    echo "1 is not equal to 1"
  fi

  # using case statements
  case "$1" in
    start)
      echo "Starting..."
      ;;
    stop)
      echo "Stopping..."
      ;;
    restart)
      echo "Restarting..."
      ;;
    *)
      echo "Usage: $0 {start|stop|restart}"
      ;;
  esac

  # use of & instead of ;;  in case statement

}

colorsfun(){
  # display colors
  echo -e "\033[31mError\033[0m"

  # display colors using tput
  echo "$(tput setaf 1)Error$(tput sgr0)"
  
  # display colors using printf
  printf "\033[31mError\033[0m\n"
  
  # display colors using echo
  echo -e "\e[31mError\e[0m"
  
  # different colors and their codes
  RED="\033[31m"
  GREEN="\033[32m"
  YELLOW="\033[33m"
  BLUE="\033[34m"
  RESET="\033[0m"
  
  echo -e "${RED}Error${RESET}"
  echo -e "${GREEN}Success${RESET}"
  echo -e "${YELLOW}Warning${RESET}"
  echo -e "${BLUE}Info${RESET}"


}

advancedtest(){

  # using [[ ]] instead of [ ]
  # [[ expression ]]
  if [[ 1 -eq 1 && 2 -eq 2 ]]; then
    echo "1 is equal to 1"
  else
    echo "1 is not equal to 1"
  fi

  # using (( )) instead of [ ]
  # (( expression ))
  var1=2
  if (( 1 == 1 && var1 == 2 )); then
    echo "1 + 2 = $((1+2))"
  else
    var=1
    echo "printing var: $((var++))"
  fi

}

commandoptions(){
  # use $-
  echo $-

  echo "$0 has options $-"
  # h means hashall that means it is invoked from PATH parameter
  # i means interactive
  # m means monitor mode
  # B means brace expansion
  # H means history expansion
  # P means privileged
  # T means keyword tracing
  # a means array
  # b means notify
  # e means errexit
  # f means noglob
  # k means Keyword
}

variableoperations(){
  # default value
  echo ${var:-"Default value"}

  # declared but not set
  echo ${var:="Default value"}
  # echo ${var:?"Default value"}
  # echo ${var:+"Default value"}
  echo ${var:-"Default value"}

}

loopsfun(){
  # for loop
  for i in {1..10}; do
    echo $i
  done

  # continue and break
  for i in {1..10}; do
    if [[ $i -eq 5 ]]; then
      continue
    fi
    echo $i
  done

  for i in {1..10}; do
    if [[ $i -eq 5 ]]; then
      break
    fi
    echo $i
  done

  # while loop
  i=1
  while [[ $i -le 10 ]]; do
    echo -e "$i \c"
    ((i++))
  done; echo

  # until loop
  i=10
  until (( i < 0 )); do
    echo -e "$i \c"
    ((i--))
  done; echo

}

readfiles(){

  # read a file line by line
  while read line; do
    echo $line
  done < file.txt

}

# declare -F # list all functions
