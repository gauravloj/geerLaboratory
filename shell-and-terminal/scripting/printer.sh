# check printer info
lpstat -a

# check default printer
lpstat -d

# Detailed printer info
lpstat -t

# print output of the command
cat filetoprint | lp

# using pr command: 
# -n Producesncolumns of output.
# -d Double-spaces the output.
# -hheader Printsheaderat the top of each page.
# -t Eliminates printing of header and top/bottom margins.

# print the formatted output to the terminal
pr -2 -h "Restaurants" food

# send to printer
pr -2 -h "Restaurants" food | lpr
