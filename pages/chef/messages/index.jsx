import MessagesCard from "../../../components/messageItem";
import LayoutTwo from "../../../components/layouts/layout-two";
import { useEffect } from "react";
import { FetchMessagesAPI } from '../../../utils/firebase'
import { useState } from 'react';
import useUser from "../../../custom-hooks/use-user";


function Messages() {

  const [ messages, setMessages ] = useState([])
  const { user } = useUser();

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    const { data } = user
    const { _id } = data
    const response = await FetchMessagesAPI(_id)
    setMessages(response)
    const chefIds = response.map((item) => {
      if (item.senderId === _id) return item.receiver
      if (item.receiver === _id) return item.senderId
    })
  }

  return (
    <div className="w-11/12 mx-auto pt-32 pb-10">
      <h1 className="text-2xl font-semibold mb-8">Messages</h1>
      {
        messages.map(item => <MessagesCard key={item.id} data={item} user={user?.data?._id} />)
      }
    </div>
  );
}

Messages.getLayout = LayoutTwo;

export default Messages;
