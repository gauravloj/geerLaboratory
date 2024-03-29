# typed variables

# Declare an array
# declare -a
# local -a
# readonly -a

# declare array directly
# mylist[0]=foo 
# mylist=()

# push an item
# mylist+=(foo)
# mylist+=(bar)
# mylist+=(baz)
# mylist+=(one two)
# mylist+=("three four")

# # displaying array items
# echo -e "\nThe element count is: ${#mylist[@]} or ${#mylist[*]}"
# echo -e "\nThe length of element [5] is: ${#mylist[5]}"
# echo -e "\nDump or list:"
# declare -p mylist
# echo -n "\${mylist[@]} = " ; printf "%q|" ${mylist[@]} 
# echo -en "\n\${mylist[*]} = " ; printf "%q|" ${mylist[*]} 
# echo -en "\n\"\${mylist[@]}\" = " ; printf "%q|" "${mylist[@]}" 
# echo -en "\n\"\${mylist[*]}\" = " ; printf "%q|" "${mylist[*]}" 
# echo -e "\t# But this is broken!"
 
# # iterating
# echo -e "\nforeach \"\${!mylist[@]}\":" 
# for element in "${!mylist[@]}"; do
#   echo -e "\tElement: $element; value: ${mylist[$element]}" 
# done
# 
# echo -e "\nBut don't do this: \${mylist[*]}" 
# for element in ${mylist[*]}; do
#   echo -e "\tElement: $element; value: ${mylist[$element]}" 
# done

# array slices
# echo -e "\nStart from element 3 and show a slice of 2 elements:" printf "%q|" "${mylist[@]:3:2}"
# echo ''
# echo -e "\nShift FIRST element [0] (dumped before and after):"
# declare -p mylist # Display before
# mylist=("${mylist[@]:1}") # First element, needs quotes
# #mylist=("${mylist[@]:$count}") # First #count elements
# declare -p mylist # Display after

# echo -e "\nPop LAST element (dumped before and after):" 
# declare -p mylist
# unset -v 'mylist[-1]' # Bash v4.3+ 
# #unset -v "mylist[${#mylist[*]}-1]" # Older
# declare -p mylist

# # delete slices
# echo -e "\nDelete element 2 using unset (dumped before and after):"
# declare -p mylist
# unset -v 'mylist[2]'
# declare -p mylist
# # Delete the entire list
# unset -v mylist

# = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = 

# declare an associative array
# declare -A
# local -A
# readonly -A

hashplay(){
  declare -A myhash

  # add items
  myhash[a]='foo'
  myhash[b]='bar'
  myhash[c]='baz'
  myhash[d]='one two'
  myhash[e]='three four'

  # display
  echo -e "\nThe key count is: ${#myhash[@]} or ${#myhash[*]}"
  echo -e "\nThe length of the value of key [e] is: ${#myhash[e]}"
  echo -e "\nDump or list:"
  declare -p myhash
  echo -n "\${myhash[@]} = " ; printf "%q|" ${myhash[@]} 
  echo -en "\n\${myhash[*]} = " ; printf "%q|" ${myhash[*]} 
  echo -en "\n\"\${myhash[@]}\" = " ; printf "%q|" "${myhash[@]}" 
  echo -en "\n\"\${myhash[*]}\" = " ; printf "%q|" "${myhash[*]}" 
  echo ''

  # iterating
  echo -e "\nforeach \"\${!myhash[@]}\":" 
  for key in "${!myhash[@]}"; do
    echo -e "\tKey: $key; value: ${myhash[$key]}" 
  done
  echo -e "\nBut don't do this: \${myhash[*]}" 
  for key in ${myhash[*]}; do
    echo -e "\tKey: $key; value: ${myhash[$key]}" 
  done

  # slices

  echo -e "\nStart from element 3 and show a slice of 2 elements:" printf "%q|" "${myhash[@]:3:2}"
  echo '' 

  # delete 
  echo -e "\nDelete key c using unset (dumped before and after):"
  declare -p myhash
  unset -v 'myhash[c]'
  declare -p myhash
  # Delete the entire hash
  unset -v myhash

}

function stringoperations(){
  echo ${PATH#bin:} # remove shortest prefix
  echo ${PATH##bin:} # remove longest prefix
  echo ${PATH%:bin} # remove shortest suffix
  echo ${PATH%%:bin} # remove longest suffix
  echo ${PATH/bin/BIN} # replace First
  echo ${PATH//bin/BIN} # replace All
}

# 'shift' to discard the first argument
# getopt -o abc: --long alpha,bravo,charlie: -n 'myprogram' -- "$@"
# OPTARG is the option's argument (if any)

# while getopts ":ab:c" opt; do
#       case $opt in
# a ) process option -a ;;
# b ) process option -b
# $OPTARG is the option's argument ;;
# c ) process option -c ;;
#           \? ) echo 'usage: alice [-a] [-b barg] [-c] args.
#                exit 1
# esac done
#   shift $(($OPTIND - 1))
#   normal processing of arguments...

# IO redirections
# 'n' is the file descriptor
# pipes : | 
# output : > >>, n> n>>
# input : < << <<<, n< n<< n<<<
# noclobber: >| file, n>| file
# both : <> file, n<> file
# duplicate: n>& m, n<& m, n>&, n<&
# close the stream: n>&-, n<&-, <&-, >&-
# file descriptor : 2> 2>> 2>&1 2>&- 2<&- 2>/dev/null
# here document : <<EOF
# here string : <<<
# process substitution : <(cmd) >(cmd)


# eval : evaluate a string as a command
