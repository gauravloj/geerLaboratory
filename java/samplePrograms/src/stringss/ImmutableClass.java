package stringss;

/**
 * A class should be declared as final so that it can’t be extended. All the
 * fields should be made private so that direct access is not allowed No setter
 * methods Make all mutable fields final, so that they can be assigned only
 * once.
 * 
 * @author geerivana
 *
 */
public class ImmutableClass {
	private final String coursename;

	ImmutableClass(final String coursename) {
	this.coursename = coursename;
	}

	public final String getName() {
		return coursename;
	}

	public static void main(String[] args) {
		ImmutableClass obj = new ImmutableClass("Machine Learning");
		System.out.println(obj.getName());

	}

}
