import { Icon, Box, Avatar, Button } from '@material-ui/core';

const CancelBooking = () => {
  return (
    <div className="w-3/5 mx-auto pt-32 pb-10">
      <div className="flex flex-col items-center w-full justify-center mb-10">
        <Icon className="canel-big-icon mb-4">
          event_busy_outline
        </Icon>
        <h1 className="text-4xl font-semibold mb-8">Chef Cancelled</h1>
      </div>
      <div className="border border-gray-300 px-5 py-6 w-full rounded-xl">
        <Box className="flex items-center justify-between">
          <Box className="flex items-center justify-start">
            <Avatar className="big-avtar">M</Avatar>
            <Box className="grid ml-5">
              <Box className="flex items-center justify-start mb-2">
                <h2 className="text-2xl font-semibold">
                  Mary Reynolds
                </h2>
                <Box className="flex items-center justify-center border-white border hover:border-black hover:rounded-lg px-4 py-2 ml-1 mb-1">
                  <Box className="bg-gray-200 h-6 w-6 rounded-full flex items-center justify-center">
                    <Icon className="!text-xs">
                      chat_bubble_outline
                    </Icon>
                  </Box>
                  <Box className="underline font-medium ml-3"> Message </Box>
                </Box>
              </Box>
              <span className="text-lg font-light flex items-center justify-start">
                <Icon className="mr-1 text-base">
                  location_on_outline
                </Icon>
                Bay Area
              </span>
            </Box>
          </Box>
          <Box className="text-right">
            <Box className="font-semibold text-2xl mb-1">
              8500 000 000
            </Box>
            <Box className="text-gray-400 text-lg">
              89, Sula Street, CA-94601
            </Box>
          </Box>
        </Box>
      </div>
      <Box className="mt-6 p-6 border border-gray-200 rounded-xl">
        <Box className="flex items-center justify-between border-dashed border-b pb-4">
          <Box className="flex items-center justify-between w-1/2">
            <Box className="text-gray-400 grid text-xs">
              <Box className="flex items-center justify-start">
                <Icon className="mr-3">
                  list_alt_outline
                </Icon>
                <Box>
                  Order ID
                </Box>
              </Box>
              <p className="font-medium text-black text-base mt-2"> 1448 </p>
            </Box>
            <Box className="text-gray-400 grid text-xs">
              <Box className="flex items-center justify-start">
                <Icon className="mr-3">
                  calendar_today_outline
                </Icon>
                <Box>
                  Booked for
                </Box>
              </Box>
              <p className="font-medium text-black text-base mt-2"> { "16th Apr'21 - 7pm to 8.55pm" } </p>
            </Box>
          </Box>
          <Box className="flex items-center justify-end">
            <Button color="secondary">Cancelled</Button>
            <Icon className="cursor-pointer ml-4">
              more_vert
            </Icon>
          </Box>
        </Box>
        <Box className="text-gray-400 grid text-xs pt-4">
          <Box className="flex items-center justify-start">
            <Icon className="mr-3">
              event_note_outline
            </Icon>
            <Box>
              Reason For Cancellation
            </Box>
          </Box>
          <p className="font-medium text-black text-base mt-2">
            Pellentesque tincidunt tristique neque, eget venenatis enim gravida quis.
          </p>
        </Box>
      </Box>
    </div>
  )
}

export default CancelBooking;