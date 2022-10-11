import { Icon, Avatar, Box } from "@material-ui/core";

const MessageDetailItem = ({ data, info }) => {

  return (
    <Box className="mb-10">
      <Box className="flex items-start justify-start mb-4">
        <Avatar className="big-avtar" src={info.img}> { info?.name[0]} </Avatar>
        <Box className="grid ml-5">
          <h2 className="text-lg font-bold mb-2">
           { info?.name }
          </h2>
        </Box>
      </Box>
      <Box>
        <p className="text-justify"> { data.message }</p>
      </Box>
    </Box>
  )
}

export default MessageDetailItem;