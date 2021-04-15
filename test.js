const df = require('date-fns')


const result = df.eachWeekOfInterval({
  start: df.parseISO('2020-01-01'),
  end: df.parseISO('2021-08-14')
}, {
  locale: 'sv',
  weekStartsOn: 1,
})
var weeks = []
var previousId = ''
var nextId = ''

for (r of result) {
  let week = {
    weekNumber: '',
    days: [],
    year: '',
    'id': '',
    'nextId': '',
    'previousId': '',
  }
  let weekNumber = df.getWeek(df.parseISO(r.toISOString()), {
    locale: 'sv',
    firstWeekContainsDate: 4
  }).toString().padStart(2, '0')

  week.weekNumber = weekNumber
  // df.getWeek((df.parseISO(r.toISOString())))
  let year = r.toLocaleDateString('sv-SE', {
    year: 'numeric'
  }).toString()
  week.year = year
  week.id = year + 'v' + week.weekNumber
  let days = []
  let mondayDate = r.toLocaleDateString('sv-SE', {
    day: '2-digit',
    year: 'numeric',
    month: '2-digit'
  })
  let tuesdayDate = formatDate(df.nextTuesday(r))
  let wednesdayDate = formatDate(df.nextWednesday(r))
  let thursdayDate = formatDate(df.nextThursday(r))
  let fridayDate = formatDate(df.nextFriday(r))
  let saturdayDate = formatDate(df.nextSaturday(r))
  let sundayDate = formatDate(df.nextSunday(r))
  week.days = [{
    name: 'måndag',
    date: mondayDate
  }, {
    name: 'tisdag',
    date: tuesdayDate
  }, {
    name: 'onsdag',
    date: wednesdayDate
  }, {
    name: 'torsdag',
    date: thursdayDate
  }, {
    name: 'fredag',
    date: fridayDate
  }, {
    name: 'lördag',
    date: saturdayDate
  }, {
    name: 'söndag',
    date: sundayDate
  }]
  if (weeks.length > 0) {
    weeks[weeks.length - 1].nextId = week.id
    week.previousId = weeks[weeks.length - 1].id
  }
  weeks.push(week)
}
console.log(JSON.stringify(weeks, " ", 2))

function formatDate(d) {

  return d.toLocaleDateString('sv-SE', {
    day: '2-digit',
    year: 'numeric',
    month: '2-digit'
  })
}