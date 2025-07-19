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
import './index.css'
const FilterGroups = props => {
  const renderEmployeList = () => {
    const {updatemploymentTypeCheck} = props
    return employmentTypesList.map(each => {
      const updatTypeList = () =>
        updatemploymentTypeCheck(each.employmentTypeId)

      return (
        <li key={each.employmentTypeId}>
          <input
            type="checkbox"
            id={each.employmentTypeId}
            onChange={updatTypeList}
          />
          <label htmlFor={each.employmentTypeId}>{each.label}</label>
        </li>
      )
    })
  }
  const renderEmployeType = () => (
    <>
      <h1 className="para1">Type of Employment</h1>
      <ul>{renderEmployeList()}</ul>
    </>
  )

  const rederSalaryRangeList = () => {
    const {updateSalaryRangeId, activeSalaryRangeId} = props
    return salaryRangesList.map(each => {
      const onChangeRange = () => updateSalaryRangeId(each)
      const isActive = each.salaryRangeId === activeSalaryRangeId
      return (
        <li key={each.salaryRangeId}>
          <input
            type="radio"
            id={each.salaryRangeId}
            name="salary ranges"
            onChange={onChangeRange}
            checked={isActive}
          />
          <label htmlFor={each.salaryRangeId}>{each.label}</label>
        </li>
      )
    })
  }
  const renderSalaryRangeType = () => (
    <>
      <h1 className="para1">Salary Range</h1>
      <ul>{rederSalaryRangeList()}</ul>
    </>
  )

  return (
    <div>
      {renderEmployeType()}
      <hr className="seperator" />
      {renderSalaryRangeType()}
    </div>
  )
}
export default FilterGroups
