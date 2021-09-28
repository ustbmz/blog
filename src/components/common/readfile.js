// eslint-disable-next-line @typescript-eslint/no-var-requires
import fs from 'fs'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const readfile = () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const buf = fs.readFileSync('D:\\Project\\blog\\src\\components\\common\\Docker.md')
  const data = fs.readFileSync('D:\\Project\\blog\\src\\components\\common\\Docker.md', 'utf8')

  console.log(buf) // <Buffer 48 65 6c 6c 6f>
  console.log(data) // Hello
  return data
}
