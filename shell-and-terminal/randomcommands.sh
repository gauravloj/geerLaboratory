# command to parse different blackarch package tools:
curl https://www.blackarch.org/tools.html | grep 'tbl-categorie' | sed 's/.*title=".*">\([-a-z ]*\).*/\1/' | sort -u | grep '^[ b][bl]' | sed 's/ //' > blackarch-alltools.txt
