with open('uploads/day2.js', 'r') as file:
    filestring = file.read()
filestring = filestring.split('`')[1].splitlines()

# Part one
answerA = {'x':0, 'y':0, 'final':0} 
inputArray = []

for i in range(len(filestring)):
  [direction, num] = filestring[i].split(' ')
  if direction == 'forward':
    answerA['x'] += int(num)
  elif direction == 'up':
    answerA['y'] -= int(num)
  elif direction == 'down':
    answerA['y'] += int(num)

answerA['final'] = answerA['x'] * answerA['y']
print(answerA['final'])

# Part two
answerB = {'x':0, 'aim':0, 'y':0, 'final':0} 
inputArray = []

for i in range(len(filestring)):
  [direction, num] = filestring[i].split(' ')
  if direction == 'forward':
    answerB['x'] += int(num)
    answerB['y'] += int(num) * answerB['aim']
  elif direction == 'up':
    answerB['aim'] -= int(num)
  elif direction == 'down':
    answerB['aim'] += int(num)

answerB['final'] = answerB['x'] * answerB['y']
print(answerB['final'])