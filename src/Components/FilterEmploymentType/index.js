import {Component} from 'react'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

class FilterEmploymentType extends Component {
  getEmpTypeList = () =>
    employmentTypesList.map(eachItem => {
      const {employmentSelected} = this.props
      const onChangeEmpType = event => employmentSelected(event.target.value)

      return (
        <li key={eachItem.employmentTypeId} onChange={onChangeEmpType}>
          <input
            className="emp-check-box"
            type="checkbox"
            id={eachItem.employmentTypeId}
            name={eachItem.employmentTypeId}
            value={eachItem.employmentTypeId}
          />
          <label className="emp-type-lable" htmlFor={eachItem.employmentTypeId}>
            {eachItem.label}
          </label>
        </li>
      )
    })

  render() {
    return <div>{this.getEmpTypeList()}</div>
  }
}

export default FilterEmploymentType
