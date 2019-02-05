import { Formik, FieldArray } from 'formik'
import { isEmpty, propOr } from 'ramda'
import * as React from 'react'
import { Grid, Section, Title, Button, Icon, ICONS, Text } from '../../../ui'
import { Colors } from '../../../util/Colors'
import { ParsedGroups, Sides } from '../../../util/sqmTypes'
import { GroupTiles } from './GroupTiles'
import styled from 'styled-components'

const BorderBottomTitle = styled(Title)`
  && {
    border-bottom: 1px solid;
  }
`

interface Props {
  data: ParsedGroups
  onReset: () => void
}

const ORDER = [Sides.BLUFOR, Sides.OPFOR, Sides.INDEPENDENT, Sides.CIVILIAN]
export default class GroupManager extends React.PureComponent<Props> {
  render() {
    const { data, onReset } = this.props
    if (!data) return null

    return (
      <React.Fragment>
        <Button isRounded isMedium onClick={onReset}>
          <Icon icon={ICONS.faRedo} />
          <Text>Reset</Text>
        </Button>
        <Formik initialValues={data} onSubmit={() => {}} validateOnBlur={true} validateOnChange={false}>
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
              return (
                <Section key={side}>
                  {/* <textarea style={{ width: '100%' }} readOnly value={JSON.stringify(values)} /> */}
                  <BorderBottomTitle style={{ color: Colors.Sides[side] }}>{side.toUpperCase()}</BorderBottomTitle>
                  <Grid.Container isMultiline>
                    <GroupTiles
                      groups={values[side]}
                      formikKey={side}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                    />
                  </Grid.Container>
                </Section>
              )
            })
          }}
        </Formik>
      </React.Fragment>
    )
  }
}
