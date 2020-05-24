/*
- File operations
    - Create file
    - Open file 
    - read/write file
    - close file
- Syntax for declaring file pointer: 
    - File *fptr;
- Syntaxt fopen function provided by c
    - File *fopen(const char *filename, const char *mode);
    - Modes: refer 'images/file-open-modes.png'
- Syntax for close function provided by c:
    - int fclose(File *fptr);
    - It returns 0 if successfully closed else returns EOF (constant defined in filestdio.h)
    - This function flushes any data in file buffer, closes the file and release memory allocated to the file
- Syntax for Reading a file:
    - Read single character from file
        - int fgetc(File *fptr);
        - It reads a character from the file buffer referenced by fptr.
        - In returns character read from file if successful else returns EOF
    - Read string from stream of file
        - char *fgets(char *buf, int n, File *fptr);
        - It reads n character from the file buffer referenced by fptr and copies it to 'buf' and appends a null character in the end.
    - Read string from file word by word
        - int *fscanf(File *fptr, const char *format,...);
        - It readsfile until white space is encountered
        - In returns non-negative value if successful else returns EOF

- Syntax for writing to a file:
    - write string to file
        - int fputs(char *buf, File *fptr);
        - It writes string buf to file referenced by fptr
        - In returns non-negative value if successful else returns EOF
    - write formatted string to file
        - int fprintf(File *fptr, const char *format,...);
        - It writes string which is formatted by var 'format'
        - In returns non-negative value if successful else returns EOF

- File operations for bonary files
    - fread : for reading binary file
    - fwrite :
        - for wirting to binary file
        - syntax : fwrite(addreass_data, size_data, numbers_data, file_pointer)
    - Opening modes : same as normal file modes with 'b' appended to each mode. Eg. read mode is 'rb', write mode is 'wd'
    - fseek : Sets the read pointer on file to specified offset
        - int fseek(File *stream, long int offset, int whence)



*/

#include <stdio.h>
#include <stdlib.h>



int main () {
    // Inline Array initialization
    File *fptr;
    char ch;

    // Creating a file
    fptr = fopen("testfile.txt", "w"); // opens file in write mode

    printf("Enter data to write : ");

    // Writing to a file
    while ((ch = getchar()) != EOF){
        fputc(ch, fptr);
    }

    // Closing file
    fclose(fptr);

    // Opening a file for reading
    fptr = fopen("testfile.txt", "r"); // opens file in read mode
    while ((ch = getc(fptr)) != EOF){
        printf("%c", ch);
    }

    fclose(fptr);
}

