import moment from 'moment'

let data = []

for (let i = 0; i < 144; i++) {
  
}

const handleTimeChange = (data: any) => {
  if (data) {
    const time = data.split("T")[1]
    const hourAndMin = time ? time.split(":").slice(0, 2) : null
    return hourAndMin ? hourAndMin.join(":") : null
  }
}