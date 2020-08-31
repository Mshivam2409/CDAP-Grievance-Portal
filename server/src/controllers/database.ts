import low from "lowdb"
import FileSync from "lowdb/adapters/FileSync"

const adapter1 = new FileSync(process.env.DIR + "/data/grievances.json")

const grievancesdb = low(adapter1)

const adapter2 = new FileSync(process.env.DIR + "/data/students.json")

const studentsdb = low(adapter2)

const adapter3 = new FileSync(process.env.DIR + "/data/cdap.json")

const CDAPdb = low(adapter3)

export { grievancesdb, studentsdb, CDAPdb }