import { Box, Avatar, Badge, Icon } from '@material-ui/core'
import { useRouter } from "next/router";

const MessageItem = ({ data, user }) => {

  const router = useRouter();

  const getChefId = () => {
    if (data.senderId === user) return data.receiver
    if (data.receiver === user) return data.senderId
  }

  return (
    <Box className="border border-200 rounded-lg mb-6">
      <Box className="px-4 py-3">
        <Box className="grid grid-cols-6 gap-4">
          <Box className="col-span-2 flex items-start justify-start border-r border-gray-200">
            <Badge variant="dot" color="error">
              <Avatar className="small-avtar">M</Avatar>
            </Badge>
            <Box className="grid ml-5">
              <h2 className="text-lg font-bold mb-2">
                Mary Reynolds
              </h2>
              <span className="text-sm font-light flex items-center justify-start">
                <Icon className="mr-1 text-base">
                  location_on_outline
                </Icon>
                Bay Area
              </span>
            </Box>
          </Box>
          <Box className="col-span-4 font-semibold overflow-ellipsis overflow-hidden h-12 my-auto px-4" onClick={() => router.replace(`/chef/messages/${data.orderId}?cu=${user}&cf=${getChefId()}`)}>
            { data.message }
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default MessageItem;