package samplePrograms.core;

import java.util.ArrayList;
import java.util.Collection;
import java.util.EnumSet;

enum Courses {
	DevOps, BigData, Python, DataScience, RPA
};

public class EnumSat {
	public static void main(String[] args) {
		// Create an EnumSet
		EnumSet<Courses> sample_set;

		// of method
		// Add single element
		sample_set = EnumSet.of(Courses.DevOps);
		// Display the set
		System.out.println("The EnumSet after adding a single element is: " + sample_set);

		// Add two elements
		sample_set = EnumSet.of(Courses.DevOps, Courses.BigData);
		// Display the set
		System.out.println("The EnumSet after adding two elements is: " + sample_set);

		// Add three elements
		sample_set = EnumSet.of(Courses.DevOps, Courses.BigData, Courses.Python);
		// Display the set
		System.out.println("The EnumSet after adding three elements is: " + sample_set);

		// Add four elements
		sample_set = EnumSet.of(Courses.DevOps, Courses.BigData, Courses.Python, Courses.DataScience);
		// Display the set
		System.out.println("The EnumSet after adding four elements is: " + sample_set);

		// Add five elements
		sample_set = EnumSet.of(Courses.DevOps, Courses.BigData, Courses.Python, Courses.DataScience, Courses.RPA);
		// Display the set
		System.out.println("The EnumSet after adding five elements is: " + sample_set);

		// Range method
		sample_set = EnumSet.range(Courses.BigData, Courses.DataScience);
		// Display the set
		System.out.println("The range of the EnumSet is: " + sample_set);

		// allOf method
		sample_set = EnumSet.allOf(Courses.class);
		// Display the set
		System.out.println("All the elements in the EnumSet are: " + sample_set);

		// copyOf(Collection) method

		// Create an empty collection
		Collection<Courses> samplecollection = new ArrayList<Courses>();
		// Add elements to the samplecollection
		samplecollection.add(Courses.DevOps);
		samplecollection.add(Courses.BigData);
		samplecollection.add(Courses.Python);
		// Display the sample collection set
		System.out.println("Elements in the sample collection set are: " + samplecollection);
		// Create a new EnumSet to store the collection items
		EnumSet<Courses> final_enumset = EnumSet.copyOf(samplecollection);
		// Display the EnumSet
		System.out.println("Elements in the EnumSet are: " + final_enumset);

		// copyOf(EnumSet) method

		// Get all the elements from Courses
		EnumSet<Courses> example_set = EnumSet.allOf(Courses.class);
		// Display the initial EnumSet(sample_set)
		System.out.println("The elements in the initial EnumSet are: " + example_set);
		// Copy the elements from the above set
		EnumSet<Courses> final_set = EnumSet.copyOf(example_set);
		// Display the elements in the copied EnumSet
		System.out.println("The elements in the copied EnumSet are: " + final_set);

		// complementOf method
		// Sample Set
		sample_set = EnumSet.of(Courses.DevOps, Courses.BigData, Courses.Python);
		// Create an EnumSet
		EnumSet<Courses> complement_set;
		// Complement the above set
		complement_set = EnumSet.complementOf(sample_set);
		// Display the elements in the complement EnumSet
		System.out.println("The elements in the complement EnumSet are: " + complement_set);

		// noneOf method
		// Create empty set
		EnumSet<Courses> none_example_set = EnumSet.noneOf(Courses.class);
		// Display the elements in the set
		System.out.println("EnumSet consists of the elements: " + none_example_set);

		// clone method
		EnumSet<Courses> final_clone_set = sample_set.clone();
		// Display the EnumSet
		System.out.println("The clone set consists of the elements:" + final_clone_set);

	}

}
