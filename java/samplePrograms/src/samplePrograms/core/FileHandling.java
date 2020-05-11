package samplePrograms.core;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.Arrays;
import java.util.List;
import java.util.Scanner;

public class FileHandling {

	private void createFile() throws IOException {
		File file = new File("c://temp//testFile1.txt");

		// create the file but not write the content.
		if (file.createNewFile()) {
			System.out.println("File is created!");
			// write content
			FileWriter writer = new FileWriter(file);
			writer.write("Test data");
			writer.close();
		} else {
			System.out.println("File already exists.");
		}

		// create the file and write the content.
		String data = "Test data";
		FileOutputStream out = new FileOutputStream("c://temp//testFile2.txt");
		out.write(data.getBytes());
		out.close();

		// Create the file. without worrying about closing resources
		data = "Test data";
		Files.write(Paths.get("c://temp//testFile3.txt"), data.getBytes());
		// or
		List<String> lines = Arrays.asList("1st line", "2nd line");
		Files.write(Paths.get("file6.txt"), lines, StandardCharsets.UTF_8, StandardOpenOption.CREATE,
				StandardOpenOption.APPEND);

		// Temporary file
		final Path path = Files.createTempFile("myTempFile", ".txt");
		System.out.println("Temp file : " + path);
		// delete file on exist.
		path.toFile().deleteOnExit();

		// Temporary file using nio
		File temp;
		temp = File.createTempFile("myTempFile", ".txt");

		System.out.println("Temp file created : " + temp.getAbsolutePath());
	}

	private void getFileInfo() {
		// Creating an object of a file
		File myObj = new File("NewFilef1.txt");
		if (myObj.exists()) {
			// Returning the file name
			System.out.println("File name: " + myObj.getName());

			// Returning the path of the file
			System.out.println("Absolute path: " + myObj.getAbsolutePath());

			// Displaying whether the file is writable
			System.out.println("Writeable: " + myObj.canWrite());

			// Displaying whether the file is readable or not
			System.out.println("Readable " + myObj.canRead());

			// Returning the length of the file in bytes
			System.out.println("File size in bytes " + myObj.length());
		} else {
			System.out.println("The file does not exist.");
		}
	}

	private void writeFile() throws IOException {
		FileWriter myWriter = new FileWriter("D:FileHandlingNewFilef1.txt");
		// Writes this content into the specified file
		myWriter.write("Java is the prominent programming language of the millenium!");

		// Closing is necessary to retrieve the resources allocated
		myWriter.close();
		System.out.println("Successfully wrote to the file.");

	}

	private void readFile() throws FileNotFoundException {
		// Creating an object of the file for reading the data
		File myObj = new File("D:FileHandlingNewFilef1.txt");
		Scanner myReader = new Scanner(myObj);
		while (myReader.hasNextLine()) {
			String data = myReader.nextLine();
			System.out.println(data);
		}
		myReader.close();
	}
}
