BEGIN {
	FS="|";
	OFS="|";
}


{
  delete seen
  delete idx
  for (i=1;i<=NF;i++){
    # print("test: ",$i)
    split($i, filname, ".")
    # print(filname[1], filname[2])

    if (filname[1] in seen) {
      seen[filname[1]] += 1
      delete idx[revidx[filname[1]]]
      delete revidx[filname[1]]
      }
      else {
    seen[filname[1]] = 1
      ext[filname[1]] = filname[2]
      idx[i] = $i
      revidx[filname[1]] = i
    }
  }

  # for (key in seen){
  #   if (seen[key] == 1){
  #     final[length(final)+1] = key "." ext[key]
  #     # printf "%s.%s",key, ext[key]
  #     print(key "." ext[key] )
  #     }
  #   }

  delete final
  finalidx = 1
  for (i=1; i<=NF; i++){
    if (i in idx){
      # print idx[i]
      final[finalidx] = idx[i]
      finalidx += 1
    }
  }

  if (length(final) >= 1){
  result = final[1]
  for (i = 2; i <= length(final); i ++){
    result = result "|" final[i]
    }
    print result
  } 
}

END {
#   for(i in seen){
#     # print(seen[i])
#     if (seen[i] == 1){
#       printf "%s %s\n", seen[i], i
#     } 
#     else {
# print("not seen", i)
#     }
#   }
  # print("Done")
}
