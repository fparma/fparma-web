import { Formik } from 'formik'
import { isEmpty, propOr } from 'ramda'
import * as React from 'react'
import { Grid, Section, Title } from '../../../ui'
import { Colors } from '../../../util/Colors'
import { ParsedGroups, Sides } from '../../../util/sqmTypes'
import { GroupTile } from './GroupTile'

interface Props {
  data: ParsedGroups
}

const ORDER = [Sides.BLUFOR, Sides.OPFOR, Sides.INDEPENDENT, Sides.INDEPENDENT]
export default class GroupManager extends React.PureComponent<Props> {
  render() {
    const { data } = this.props
    if (!data) return null

    return (
      <Formik initialValues={data} onSubmit={() => {}} validateOnBlur={true}>
        {({
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
          setFieldValue,
        }) => {
          return ORDER.map(side => {
            return isEmpty(propOr([], side, data)) ? null : (
              <Section key={side}>
                <textarea style={{ width: '100%' }} readOnly value={JSON.stringify(values)} />
                <Title style={{ color: Colors.Sides[side] }}>{side.toUpperCase()}</Title>
                <Grid.Container isMultiline>
                  {values[side].map((group, index) => {
                    const key = `${side}[${index}]`
                    return (
                      <GroupTile
                        key={key}
                        group={group}
                        formikKey={key}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                      />
                    )
                  })}
                </Grid.Container>
              </Section>
            )
          })
        }}
      </Formik>
    )
  }
}
