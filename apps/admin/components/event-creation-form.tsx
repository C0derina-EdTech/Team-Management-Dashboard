"use client"
import * as z from "zod"
import { eventformSchema } from '@/lib/form-schema'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"
import { motion } from "motion/react"
import { Check } from "lucide-react"
import { Field, FieldGroup, FieldContent, FieldLabel, FieldDescription, FieldError, FieldSeparator } from "@coderina-ams/ui/components/field"
import { Button } from "@coderina-ams/ui/components/button"
import { Input } from "@coderina-ams/ui/components/input"
import { Textarea } from "@coderina-ams/ui/components/textarea"
import { format } from "date-fns"
import { Popover, PopoverContent, PopoverTrigger } from "@coderina-ams/ui/components/popover"
import { cn } from "@coderina-ams/ui/lib/utils"
import { Calendar } from "@coderina-ams/ui/components/calendar"
import { Calendar as CalendarIcon, X } from "lucide-react"
import { RadioGroup, RadioGroupItem } from '@coderina-ams/ui/components/radio-group'
import { Label } from '@coderina-ams/ui/components/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@coderina-ams/ui/components/select"
import { TagInput } from "@coderina-ams/ui/components/tag-input"



type Schema = z.infer<typeof eventformSchema>;

export function DraftForm() {

const form = useForm<Schema>({
  resolver: zodResolver(eventformSchema as any),
})
const { formState: { isSubmitting, isSubmitSuccessful } } = form;

const handleSubmit = form.handleSubmit(async (data: Schema) => {
  try {
    // TODO: implement form submission
    console.log(data);
    form.reset();
  } catch (error) {
    // TODO: handle error
  }
});

  if (isSubmitSuccessful) {
    return (<div className="p-2 sm:p-5 md:p-8 w-full rounded-md gap-2 border">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, stiffness: 300, damping: 25 }}
          className="h-full py-6 px-3"
        >
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.3,
              type: "spring",
              stiffness: 500,
              damping: 15,
            }}
            className="mb-4 flex justify-center border rounded-full w-fit mx-auto p-2"
          >
            <Check className="size-8" />
          </motion.div>
          <h2 className="text-center text-2xl text-pretty font-bold mb-2">
            Thank you
          </h2>
          <p className="text-center text-lg text-pretty text-muted-foreground">
            Form submitted successfully, we will get back to you soon
          </p>
        </motion.div>
      </div>)
  }
return (
      <form onSubmit={handleSubmit} className="p-2 sm:p-5 md:p-8 w-full rounded-md gap-2 border max-w-3xl mx-auto">
        <FieldGroup className="grid md:grid-cols-6 gap-4 mb-6">
          <h1 className="mt-6 mb-1 font-extrabold text-3xl tracking-tight col-span-full">New Event</h1>
<p className="tracking-wide text-muted-foreground mb-5 text-wrap text-sm col-span-full">Create a new event</p>

        <Controller
          name="eventName"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1 col-span-full">
            <FieldLabel htmlFor="eventName">Event Name *</FieldLabel>
              <Input
                {...field}
                id="eventName"
                type="text"
                onChange={(e) => {
                field.onChange(e.target.value)
                }}
                aria-invalid={fieldState.invalid}
                placeholder="Enter your event name"
                
              />
              
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

          <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1 col-span-full">
                <FieldLabel htmlFor="description">Description </FieldLabel>
                  <Textarea
                    {...field}
                    aria-invalid={fieldState.invalid}
                    id="description"
                    placeholder="Any special requirements or questions?"
                    
                  />
                  
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

        <Controller
          name="date"
          control={form.control}
          render={({ field, fieldState }) => {
            const selectedDate = field.value;
            return (
              <Field data-invalid={fieldState.invalid} className="col-span-full">
                <FieldLabel htmlFor="date">Date *</FieldLabel>
                
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="relative">
                      <Button
                        type="button"
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-start font-normal active:scale-none",
                          !selectedDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="size-4" />
                            {selectedDate ? (
                              <span>
                                
                                
                                (
                                  <div className="flex items-center gap-x-2">
                                    {selectedDate?.from &&
                                      format(selectedDate.from, "dd MMM, yyyy")}
                                    {selectedDate?.from && " - "}
                                    {selectedDate?.to &&
                                      format(selectedDate.to, "dd MMM, yyyy")}
                                  </div>
                                )
                              </span>
                            ) : (
                              <span>Select a date</span>
                            )}
                              </Button>
                            {fieldState.isDirty && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute top-1/2 end-0 -translate-y-1/2 rounded-full"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  form.resetField("date");
                                }}
                              >
                                <X />
                              </Button>
                            )}
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="range"
                      selected={selectedDate}
                      onSelect={(newDate) => {
                        form.setValue(field.name, newDate, {
                          shouldDirty: true,
                          });
                        }}
                      
                    />
                  </PopoverContent>
                </Popover>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            );
          }}
        />

        <Controller
          name="event-type"
          control={form.control}
          render={({ field, fieldState }) => {
          const options = [{"label":"Workshop","value":"workshop"},{"label":"Competition","value":"competition"},{"label":"Conference","value":"conference"},{"value":"webinar","label":"Webinar"}];
            return(
              <Field data-invalid={fieldState.invalid} className="gap-1 [&_p]:pb-2 md:col-span-3">
                <FieldLabel htmlFor="event-type">Event Type *</FieldLabel>
                
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  aria-invalid={fieldState.invalid}
                  
                >
                  {options.map(({ label, value }) => (
                    <div
                      key={value}
                      className="flex items-center gap-x-2"
                    >
                      <RadioGroupItem value={value} id={value} />
                      <Label htmlFor={value}>{label}</Label>
                    </div>
                  ))}
                </RadioGroup>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}}
        />

        <Controller
          name="format"
          control={form.control}
          render={({ field, fieldState }) => {
          const options = [{"value":"virtual","label":"Virtual"},{"value":"physical","label":"Physical"},{"value":"hybrid","label":"Hybrid"}];
          return (
            <Field data-invalid={fieldState.invalid} className="gap-1 col-span-full">
              <FieldLabel htmlFor="format">Event format *</FieldLabel>
              
              <Select
                value={field.value}
                onValueChange={field.onChange}
                
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  {options.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}}
        />

      <Controller
          name="organizer"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="gap-1 [&_p]:pb-2"
            >
              <FieldLabel htmlFor="organizer">Additional organizer </FieldLabel>
              <TagInput
                tags={field.value ?? []}
                setTags={(tags) => field.onChange(tags)}
                id="organizer"
                placeholder="Enter your additional organizer"
                
              />
              
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

      

        <Controller
          name="attendees"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1 col-span-full">
            <FieldLabel htmlFor="attendees">Attendees Estimate *</FieldLabel>
              <Input
                {...field}
                id="attendees"
                type="number"
                onChange={(e) => {
                field.onChange(e.target.valueAsNumber)
                }}
                aria-invalid={fieldState.invalid}
                placeholder="Enter your proposed attendees "
                
              />
              
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
          </FieldGroup>
          <div className="flex justify-end items-center w-full">
            <Button disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
      </form>
)}