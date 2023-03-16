import React from 'react'

type DropdownSelectProps = {
  isHorizontal?: boolean
  propertyName: string
  values: string[]
  selectedProperty: string
  onPropertyChanged: (property: string, name: string) => void
}

export default function DropdownSelect({
  isHorizontal = true,
  propertyName,
  values,
  selectedProperty,
  onPropertyChanged
}: DropdownSelectProps) {
  return (
    <div className="dropdown-select">
      <div className={`field is-vertical`}>
        <div className="field-label is-normal">
          <label className="label is-capitalized has-text-left">{propertyName}</label>
        </div>
        <div className="field-body">
          <div className="field">
            <div className="control">
              <div className="select">
                <select
                  value={selectedProperty}
                  onChange={(e) => onPropertyChanged(e.target.value, propertyName.toLowerCase())}
                >
                  {values.map((value, idx) => (
                    <option key={idx} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}