import { Formik, FormikTouched } from 'formik'
import * as React from 'react'
import { Field, Grid, Icon, ICONS, Input, Radio, RadioGroup, Text, TextArea } from 'src/ui'
import { Datepicker } from 'src/ui/Timepicker/DatePicker'
import { Timepicker } from 'src/ui/Timepicker/Timepicker'
import styled from 'styled-components'
import * as yup from 'yup'

type FormikSetValue = (arg: string, value: string) => void

const schema = yup.object().shape({
  title: yup
    .string()
    .trim()
    .min(4)
    .max(128)
    .required(),
  date: yup.date().required(),
  authors: yup.string().max(256),
  image: yup
    .string()
    .url()
    .max(2048),
  description: yup
    .string()
    .required()
    .max(4096),
})

const pad = (nr: number) => (nr < 10 ? `0${nr}` : `${nr}`)

const getDefaultHour = () => {
  const d = new Date()
  d.setUTCHours(19)
  return d.getHours()
}

const GridColumnNoPadTop = styled(Grid.Column)`
  && {
    padding-top: 0;
  }
`

const GridColumnNoPadBottom = styled(Grid.Column)`
  && {
    padding-bottom: 0;
  }
`

interface FormState {
  type: string
  title: string
  date: string
  authors: string
  image: string
  description: string
}

export default class EventInformation extends React.PureComponent<
  {},
  { fakeDate: Date | null; fakeTime: Date | null }
> {
  state = { fakeDate: null, fakeTime: null }
  minDate = new Date()

  get maxDate() {
    const date = new Date()
    date.setMonth(date.getMonth() + 2)
    return date
  }

  onSubmit = (e: FormState) => {
    console.log(e)
  }

  getMergedDate() {
    const { fakeDate, fakeTime } = this.state
    if (!fakeDate || !fakeTime) return null
    const d = new Date((fakeDate as Date).getTime())
    d.setHours((fakeTime as Date).getHours(), (fakeTime as Date).getMinutes(), 0, 0)
    return d
  }

  getEnteredHourUTC() {
    const date = this.getMergedDate()
    return date ? `${pad(date.getUTCHours())}:${pad(date.getMinutes())}` : null
  }

  onDateChange = (setFieldValue: FormikSetValue) => (d: Date) => {
    this.setState({ fakeDate: new Date(d.getTime()) }, () => this.updateDate(setFieldValue))
  }

  onTimeChange = (setFieldValue: FormikSetValue) => (d: Date) => {
    this.setState({ fakeTime: new Date(d.getTime()) }, () => this.updateDate(setFieldValue))
  }

  updateDate(setFieldValue: FormikSetValue) {
    const date = this.getMergedDate()
    setFieldValue('date', date ? date.toISOString() : '')
  }

  checkError = (touched: FormikTouched<Partial<FormState>>, errors: Partial<FormState>) => (name: keyof FormState) =>
    touched[name] && Boolean(errors[name])

  defaults: Partial<FormState> = { type: 'co' }

  render = () => (
    <Formik initialValues={this.defaults} onSubmit={this.onSubmit} validationSchema={schema} validateOnBlur={true}>
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
        const hasError = this.checkError(touched, errors)

        return (
          <React.Fragment>
            <form onSubmit={handleSubmit}>
              <Grid.Container>
                <Grid.Column sizeFullhd={5} sizeDesktop={6}>
                  <Grid.Container isMultiline isMobile>
                    <Grid.Column sizeDesktop={8} sizeTablet={8} sizeMobile={12}>
                      <Field label="Title" isError={hasError('title')}>
                        <Input
                          name="title"
                          isError={hasError('title')}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Operation FPARMA"
                        />
                        {hasError('title') && <Text isWarning>{errors.title}</Text>}
                      </Field>
                    </Grid.Column>

                    <GridColumnNoPadBottom sizeDesktop={4} sizeTablet={4} sizeMobile={12}>
                      <RadioGroup
                        name="type"
                        defaultValue={values.type}
                        label="Type of game mode"
                        onChange={handleChange}
                      >
                        <Radio label="COOP" value="co" />
                        <Radio label="TVT" value="tvt" />
                      </RadioGroup>
                    </GridColumnNoPadBottom>

                    <Grid.Column sizeDesktop={6} sizeTablet={8} sizeMobile={7}>
                      <Field label="Date">
                        <Datepicker
                          minDate={this.minDate}
                          maxDate={this.maxDate}
                          onChange={this.onDateChange(setFieldValue)}
                        />
                      </Field>
                    </Grid.Column>

                    <Grid.Column sizeDesktop={6} sizeTablet={4} sizeMobile={5}>
                      <Field label="Time">
                        <Timepicker onChange={this.onTimeChange(setFieldValue)} defaultHour={getDefaultHour()} />
                      </Field>
                    </Grid.Column>

                    <GridColumnNoPadTop isNarrow isFull>
                      <span>{values.date && `Entered time in UTC: ${this.getEnteredHourUTC()}`}</span>
                    </GridColumnNoPadTop>

                    <Grid.Column isFull>
                      <Field
                        label="Author(s) (optional)"
                        isError={hasError('authors')}
                        iconLeft={<Icon icon={ICONS.faUserTie} />}
                      >
                        <Input
                          name="authors"
                          isError={hasError('authors')}
                          placeholder="User, Other User"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {hasError('authors') && <Text isWarning>{errors.authors}</Text>}
                      </Field>
                    </Grid.Column>

                    <Grid.Column isFull>
                      <Field
                        label="Image url (optional)"
                        isError={hasError('image')}
                        iconLeft={<Icon icon={ICONS.faImages} />}
                      >
                        <Input
                          name="image"
                          isError={hasError('image')}
                          placeholder="http://example.com/image.jpg"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Field>
                      {hasError('image') && <Text isWarning>{errors.image}</Text>}
                    </Grid.Column>
                  </Grid.Container>
                </Grid.Column>
              </Grid.Container>

              <Grid.Container>
                <Grid.Column isFull>
                  <Field label="Event description" isError={hasError('description')}>
                    <TextArea
                      name="description"
                      rows={12}
                      isError={hasError('description')}
                      placeholder="If custom mods are used, remember to link them here"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Field>
                  {hasError('description') && <Text isWarning>{errors.description}</Text>}
                </Grid.Column>
              </Grid.Container>
            </form>
          </React.Fragment>
        )
      }}
    </Formik>
  )
}
