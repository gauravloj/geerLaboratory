for i in *.java; do
  echo -n "$i: "
  sed 's/[^"{};]//g' $i | tr -d '\n'
  echo 
done
