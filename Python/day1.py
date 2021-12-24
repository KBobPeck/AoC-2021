
with open('uploads/day1.js', 'r') as file:
    filestring = file.read()


filestring = filestring.split('[  ')[1].split(',\n')[0:-1]


answerA = 0
for i in range(len(filestring)-1):
    if int(filestring[i]) < int(filestring[i+1]):
        answerA += 1

print(answerA)

answerB = 0
for i in range(len(filestring)-3):
    if int(filestring[i]) < int(filestring[i+3]):
        answerB = answerB+1

print(answerB)
