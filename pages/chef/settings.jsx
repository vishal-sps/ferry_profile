import React from 'react'
import ProfileSettings from "./profile-settings"
import Tabs from '../../components/Tabs'
import ResetPassword from "./reset-pswd"

const settings = () => {
  return (
    <div className="p-4 lg:w-3/5 mx-auto pt-16 pb-10">
      <Tabs>
        <div label="Profile">
            <ProfileSettings />
        </div>
        <div label="Change Password">
            <ResetPassword/>
        </div>
        </Tabs>
    </div>
  )
}

export default settings