=begin
This is multiline commet
It starts with =begin and ends with =end
'=' should be the first character in the line in both begin and end
=end

puts "--------------  Print/Puts function  -------------------"

# print on console
print "hello underworld\n"

# prints on console with newline at the end
puts "Welcome to hell"

# Creating variables
ruler = "Satan"
title = "King of Underworld"

# brackets are used when concatenating string with variables
puts ("Hail " + ruler)
puts title

# Data types
str_type = "This is a string type variable"
int_type = 22       # this is integer type
float_type = 22.01       # this is float type
bool_type = true       # this is boolean type
nil_type = nil         # this is nil type

puts "-------------- String Operations  -------------------"

# String operations
sample = "   A quick brown Fox jumps over the lazy Dog    "
puts "Using \" in string"   # \ is the escape character to print special characters

# convert to upper case
puts sample.upcase()

# convert to lower case
puts sample.downcase()

# remove any leading and trailing white spaces
puts sample.strip()

# String length
puts sample.length()

# Search a pattern in string
puts sample.include? "Dog"

# Indexing a string to get ith character
puts sample[9]
puts sample[10, 17]   # String from 10 to 17 index
puts sample.index('jump')   # returns first index of character 'ju'


puts "--------------  Arithmatic operations  -------------------"


# Arithmatic operations
puts 22 + 1     # Addition, it will print 23
puts 22 * 1     # multiplication, it will print 22
puts 22 / 2     # division, it will print 1
puts 22^2     # Power, it will print 22 * 22
puts 22**2     # Power, it will print 22 * 22
puts 22%3     # Modulus, it will print 1

num = -22.01
puts ("Convert int to string: " + num.to_s)   # to_s will convert num to string type
puts ("Absolute value of string: " + num.abs().to_s)   # abs returns absolute value
puts ("Round the number: " + num.round().to_s)   # round the number to nearest integer
puts ("Ceil of the number: " + num.ceil().to_s)   # Returns the next integer greater than num
puts ("Floor of the number: " + num.floor().to_s)   # Returns the previous integer smaller than num

numa = "22"
numb = "1"
puts ("Concatenating two strings: " + numa + numb)   # Concatenate numa and numb as they are string
puts ("Concatenating two strings: " + (numa.to_i + numb.to_i).to_s)   # numa.to_i converts string to int
puts ("Concatenating two strings: " + (numa.to_f + numb.to_f).to_s)   # numa.to_f converts string to float



# User input
# user_input = gets
# puts ("This is user input : " + user_input + " This text will be printed in new line")

# user_input_without_newline = gets.chomp()
# puts ("This is user input : " + user_input_without_newline + " this text will be printed in same line")


puts "--------------  Array  -------------------"

# Arrays

sim_array = Array["Luci", "Dark", "Heist", "Paatal", "Mukh", 22, false, 42 - 22]

print "Printing array : "
puts sim_array

print "Printing array in reverse : "
puts sim_array.reverse()

puts ("First element of array : " + sim_array[0])   # Index starts at 0
puts ("First two elements of array : " + sim_array[0,2].to_s)   # Includes 0th and excludes 2nd element

sim_array[5] = "Gospel"
puts ("Modified element of array : " + sim_array[5])

empty_array = Array.new         # Creates an empty array
empty_array[0] = "Fer"          # assign value to 1st element
empty_array[5] = "Midnight"     # assign value to 6th element

# All values between 0 and 5 will be empty
print "Printing array with only two values : "
puts empty_array
puts ("Length of empty array: " + empty_array.length().to_s)

str_array = Array["Luci", "Dark", "Heist", "Paatal", "Mukh"]
print "Search result in empty array: "
puts str_array.include? "Dark"           # It only works if all the elements are of same type as search element

print "Printing Soretd array: "
puts str_array.sort()           # It only works if all the elements are of same type


puts "-------------- Dictionary/ Hashes   -------------------"

# Hashes/Dictionary : Key value pairs
# integers can also be used as keys
sim_dict = {
    "Berlin" => "Andres",
    "Stockholm" => "Monica",
    "Nairobi" => "Agata",
    "Professor" => "Sergio",
    :Lisbon => "Raquel"
}

puts "Printing Dictionary"
puts sim_dict

print "Printing element mapped with Lisbon and Professor: "
puts sim_dict[:Lisbon] + " " + sim_dict["Professor"]


puts "-------------- Methods  -------------------"

# Methods
def myMan
    puts "Ricksy Business"
end

# method with parameter
def wubba(catchPhrase = "noby tobi")
    puts "Lubba " + catchPhrase
end

print "Calling the function myMan: "
myMan

print "Calling the function wubba: Wubba "
wubba("Dub Dub")
print "Calling the function wubba with no parameter: Wubba "
wubba

# method with no return statement
def rixtyMin
    "Shawshank rickdemption"
end

# method with no return statement

def rixtyMinute
    return "Rickdiculus"
end

print "Function with no return statement will return last returnable value : "
puts rixtyMin

print "Function with return statement will return value after 'return' keyword : "
puts rixtyMinute


puts "-------------- Conditional flow  -------------------"

# Control flow
condition_one = true
condition_two = false
condition_three = false

puts "----- Single if"
# Single if
if condition_one
    puts "I am first"
end

puts "----- If else"
# If else
if condition_two
    puts "I am first"
else
    puts "I am second"
end

puts "----- multiple If "
if condition_one and condition_two          # logical and
    puts "I am first"
elsif condition_two or !condition_one       # logical or and logical not
    puts "I am second"
else
    "I am third"
end

# puts "-------------- Comparison operators  -------------------"
# Comparison operators
numa = 22
numb = 1
comp_op = numa < numb      # comp_op will be assigned false
comp_op = numa > numb      # comp_op will be assigned true
comp_op = numa <= numb      # comp_op will be assigned false
comp_op = numa <= numb      # comp_op will be assigned true
comp_op = numa == numb      # comp_op will be assigned true
comp_op = numa != numb      # comp_op will be assigned true

# <=> | Combined comparison operator. | x<=>y | x <=> y : =
#                                               if x < y then return -1
#                                               if x =y then return 0
#                                               if x > y then return 1
#                                               if x and y are not comparable then return nil
# ===  |   Test equality  |   x===y  |   (10...20) === 9 return false.
# .eql?  |   True if two values are equal and of the same type  |   x.eql? y  |     1 == 1.0 #=> true
#                                                                                   1.eql? 1.0 #=> false
# equal?  |   True if two things are same object.  |   obj1.equal?obj2  |   val = 10 => 10
#                                                                           val.equal?(10) => true


# puts "-------------- Case expressions -------------------"
# Case expressions

day = "Mon"
realday = ""
case day
when "Mon"
    realday = "Monday"
when "Tue"
    realday = "Tuesday"
when "Wed"
    realday = "Wednesday"
when "Thur"
    realday = "Thursday"
when "Fri"
    realday = "Friday"
when "Sat"
    realday = "Saturday"
when "Sun"
    realday = "Sunday"
else
    realday = "Invalid day"
end

puts "-------------- While loops -------------------"

# While loops
while_cond = true
ind = 1
while while_cond
    print ind.to_s + " "
    if ind == 7
        while_cond = false
    end
    ind += 1
end
puts ""
puts ""

puts "-------------- For loops -------------------"
# For loops
str_array = Array["Luci", "Dark", "Heist", "Paatal", "Mukh", ""]

puts "--> Printing array using for loop: "
for str in str_array
    puts str
end

puts "--> Printing array using each loop: "
str_array.each do |str|
    puts str
end

puts "--> Printing array using range index loop: "
for idx in 0..5
    puts str_array[idx]
end

puts "--> Printing array using times loop: "
6.times do |idx|
    puts str_array[idx]
end


# File operations

=begin
Different file modes

Mode |  Meaning
-----+--------------------------------------------------------
"r"  |  Read-only, starts at beginning of file  (default mode).
-----+--------------------------------------------------------
"r+" |  Read-write, starts at beginning of file.
-----+--------------------------------------------------------
"w"  |  Write-only, truncates existing file
     |  to zero length or creates a new file for writing.
-----+--------------------------------------------------------
"w+" |  Read-write, truncates existing file to zero length
     |  or creates a new file for reading and writing.
-----+--------------------------------------------------------
"a"  |  Write-only, starts at end of file if file exists,
     |  otherwise creates a new file for writing.
-----+--------------------------------------------------------
"a+" |  Read-write, starts at end of file if file exists,
     |  otherwise creates a new file for reading and
     |  writing.
-----+--------------------------------------------------------
"b"  |  Binary file mode (may appear with
     |  any of the key letters listed above).
     |  Suppresses EOL <-> CRLF conversion on Windows. And
     |  sets external encoding to ASCII-8BIT unless explicitly
     |  specified.
-----+--------------------------------------------------------
"t"  |  Text file mode (may appear with
     |  any of the key letters listed above except "b").

=end

begin
# Reading files
puts "-------------- Read file -------------------"
File.open(".vscode/launch.json", "r") do |file|         # Opens file in 'r' read mode
    puts "Content of launch.json are : "
    puts file.read()
    print "Search something in file : "
    puts file.read().include? "request"
end
rescue
    puts "File not found"
end

begin
File.open(".vscode/launch.json", "r") do |file|         # Opens file in 'r' read mode
    # To read all the lines in a loop, use `for lines in file.readline()`
    print "Read next line in file : "
    puts file.readline()

    # To read all the characters in a loop, use `for lines in file.readchar()`
    print "Read next char in file : "
    puts file.readchar()
end
rescue
    puts "File not found"
end

begin
puts "-------------- Write files  -------------------"
File.open(".vscode/launch.json", "a") do |file|         # Opens file in 'a' append mode
    # file.write("\n// This is the line written using ruby")
end
rescue
    puts "Unable to create file"
end


begin
# Unsafe way to open file
file = File.open(".vscode/launch.json", "r")
    puts file.read
 # now file can be used same as previous method
# If open like this, then file needs to be closed as below
file.close()
rescue
    puts "File not found"
end

puts "-------------- Error handling  -------------------"
begin
    File.open("launch.json", "r") do |file|         # Opens file in 'a' append mode
        # file.write("\n// This is the line written using ruby")
    end
rescue  Errno::ENOENT => e
    puts "File not found"
    puts e
rescue
    puts "generic exception"
end


puts "-------------- Classes and Objects  -------------------"

class Book
    # attributes are declared using 'attr_accessor'
    attr_accessor :title, :author, :pages

    # Constructor function
    def initialize(title = "Not given", author = "MeSelf", pages = 666)
        puts "Constructor called"
        @title = title
        @author = author
        @pages = pages
    end

    def printBook()
        puts ("Books created : ")
        puts ("\tBooks title : " + @title)
        puts ("\tBooks author : " + @author)
        puts ("\tBooks pages : " + @pages.to_s)
    end

    def willBeoverridden()
        puts "Base class function will not be called once overridden"
    end

end

# Creating instance of Book
kami = Book.new()
# attributes can be modified after object creation
kami.title = "Kami no shini"
kami.author = "Raito yagami"
kami.pages = 36

puts ("Books created : ")
puts ("\tBooks title : " + kami.title)
puts ("\tBooks author : " + kami.author)
puts ("\tBooks pages : " + kami.pages.to_s)


# Creating instance of Book using initializer
law = Book.new("Shinigami", "Lawliat", 93)
puts "--> Prints Book object using instance method"
puts law.printBook

puts "-------------- Inheritance  -------------------"

class JournalBook < Book # 'class a < b'  implies a is derived from b
    def willBeoverridden()
        puts "This function is overridden in JournalBook class"
    end

    def printJournal()
        printBook()
        puts "\tThis book is a journal"
    end
end

jornl = JournalBook.new("Dear Diary", "Some random guy in fish market", 222)

puts "--> Calling overridden function"
jornl.willBeoverridden()

puts "--> Calling derived class specific function"
jornl.printJournal()

puts "-------------- Modules  -------------------"


=begin
 modules are created in separate files.
 And these module files are imported wherever these functions are required
 Eg. if below module was created in 'mymodule.rb'
 then in another file 'newfile.rb', it will be imported as
 require_relative "mymodule.rb"
 or, require "mymodule.rb"
 Once imported, then any module can be used by using keywork include.
for SiPapi module, once the file is imported, then write:
    include SiPapi
to use it's functions in the current file
=end

module SiPapi
    def hi
        puts "Hola"
    end

    def bye
        puts "Adios"
    end
end

include SiPapi

print "--> Calling hi function from SiPapi module: "
puts SiPapi.hi
print "--> Calling bye function from SiPapi module: "
puts SiPapi.bye

