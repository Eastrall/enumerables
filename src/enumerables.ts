import { List } from './collection'

console.log('Starting program.')

const list = new List<number>()
list.add(1)
list.add(2)
list.add(4)
list.add(8)

for (let element of list) {
    console.log(element)
}

console.log(list.elementAt(2))

console.log('Program ended.')
