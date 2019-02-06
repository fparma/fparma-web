import { Formik, getIn } from 'formik'
import * as R from 'ramda'
import * as React from 'react'
import styled from 'styled-components'
import * as yup from 'yup'
import { Button, Grid, Icon, ICONS, Section, Text, Title } from '../../../ui'
import { Colors } from '../../../util/Colors'
import { Group, ParsedGroups, Sides } from '../../../util/sqmTypes'
import { GroupTiles } from './GroupTiles'

const BorderBottomTitle = styled(Title)`
  && {
    border-bottom: 1px solid;
  }
`

const SideContainer = styled(Section)`
  && {
    padding-left: 0;
    padding-right: 0;
    padding-top: 1rem;
  }
`

interface Props {
  data: ParsedGroups
  onReset: () => void
}

const getGroupCount = (values: ParsedGroups, side: Sides) => R.pathOr(0, [side, 'length'], values)
const ORDER = [Sides.BLUFOR, Sides.OPFOR, Sides.INDEPENDENT, Sides.CIVILIAN]

type KeysAsGroups = { [K in keyof Group]: any }

const schema = yup.object().shape({
  [Sides.BLUFOR]: yup.array().of(
    yup
      .object()
      .shape({
        name: yup
          .string()
          .required('Required')
          .min(2, 'Too short!')
          .max(48, 'Too long!'),

        side: yup.string(),
      } as KeysAsGroups)
      .noUnknown()
  ),
})

export default class GroupManager extends React.PureComponent<Props> {
  render() {
    const { data, onReset } = this.props
    if (!data) return null

    return (
      <React.Fragment>
        <Grid.Column>
          <Button isRounded isPulledRight onClick={onReset}>
            <Icon icon={ICONS.faRedo} />
            <Text>Reset</Text>
          </Button>
        </Grid.Column>

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
            const hasError = (key: string, field: string) => getIn(errors, `${key}.${field}`)
            return ORDER.map((side, index) => {
              return (
                <SideContainer key={side}>
                  {/* <textarea style={{ width: '100%' }} readOnly value={JSON.stringify(values)} /> */}
                  <BorderBottomTitle style={{ color: Colors.Sides[side] }}>
                    {side.toUpperCase()} ({getGroupCount(values, side)})
                  </BorderBottomTitle>
                  <Grid.Container isMultiline>
                    <GroupTiles
                      groups={values[side]}
                      side={side}
                      formikKey={side}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      hasError={hasError}
                    />
                  </Grid.Container>
                </SideContainer>
              )
            })
          }}
        </Formik>
      </React.Fragment>
    )
  }
}
