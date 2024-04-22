import {Component} from 'react'
import './index.css'

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class FilterSalaryRange extends Component {
  getSalaryRangeList = () =>
    salaryRangesList.map(eachItem => {
      const {salarayRangeSelected, salaryRange} = this.props
      console.log('getSalaryRangeList', salaryRange)
      const onChangeSalaryRange = event =>
        salarayRangeSelected(event.target.value)

      return (
        <li key={eachItem.salaryRangeId} onChange={onChangeSalaryRange}>
          <input
            className="emp-check-box"
            type="radio"
            id={eachItem.salaryRangeId}
            name="Salary"
            value={eachItem.salaryRangeId}
          />
          <label className="emp-type-lable" htmlFor={eachItem.salaryRangeId}>
            {eachItem.label}
          </label>
        </li>
      )
    })

  render() {
    return <div>{this.getSalaryRangeList()}</div>
  }
}

export default FilterSalaryRange
