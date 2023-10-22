using System;
using System.Collections.Generic;
using System.Linq;


public class IntPart
{
    /*
    * Ideally below variables should not be static, but as
    * the initial prototype expects a static function, hence
    * instead of changing function definition, used these variables
    * as static
    */

    // Variable that stores all the enumerations of the number
    // Although it is not needed for the given problem, but added it
    // just for the sake of storing all the enumerations
    static List<List<int>> Enumerations = new List<List<int>>();

    static List<List<int>> Enumerations = new List<List<int>>();

    // Variable to store all the products of each enumeration
    static HashSet<long> Products = new HashSet<long>();

    public static string Part(long n)
    {
        // Clearing these static variable just to ensure
        // that there is no data from previous operations
        // Had they been instance variables, then there would
        // have been no need for clearing them.
        Enumerations.Clear();
        Products.Clear();

        GenerateProducts(n, n, new List<int>());

        long[] productarray = Products.ToArray();
        Array.Sort(productarray);

        return $"Range: {productarray.Last() - productarray.First()} Average: {Products.Average():F2} Median: {GetMedian(productarray):F2}";
    }

    // Returns the median of given array
    private static double GetMedian(long[] productarray)
    {
        int mid = (productarray.Length - 1) / 2;
        if (productarray.Length % 2 == 1)
        {
            return productarray[mid];
        }

        double median = (productarray[mid] + productarray[mid + 1]) / 2.0;

        return median;
    }


    private static void GenerateProducts(long n1, long n2, List<int> summands)
    {
        if (n1 == 0)
        {
            Enumerations.Add(summands);
            long product = 1;
            foreach (var num in summands)
            {
                product *= num;
            }
            Products.Add(product);
        }
        else
        {
            foreach (int i in Enumerable.Range(1, (int)n1).Reverse())
            {
                if (i <= n2)
                {
                    List<int> newSummand = new List<int>(summands) { i };
                    GenerateProducts(n1 - i, i, newSummand);
                }
            }
        }
    }

    /**
    * Function to display Enumerations and products of the input
    */
    public static void Display()
    {
        Console.WriteLine("Enumerations: ");
        foreach (var numList in Enumerations)
        {
           foreach (var num in numList)
           {
               Console.Write(num);
               Console.Write(",");
           }
           Console.WriteLine("");
        }

        Console.WriteLine("");
        Console.WriteLine("Products: ");
        foreach (var item in Products)
        {
            Console.Write($"{item}, ");
        }
    }
}
