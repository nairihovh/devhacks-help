import useTelegram from "../hooks/useTelegram";

const Profile = () => {
    const { tgUser } = useTelegram();
    return (
        <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-sm text-center">
        <h2 className="text-3xl font-bold text-[#5C1F0C] mb-4">Բարի Գալու՜ստ</h2>

        {tgUser ? (
            <>
                <img
                src={tgUser.photo_url}
                alt="User"
                className="w-24 h-24 rounded-full mx-auto shadow-md mb-4"
                />
                <h3 className="text-xl font-semibold text-[#5C1F0C]">
                {tgUser.first_name} {tgUser.last_name}
                </h3>
            </>
        ) : (
          <p className="text-gray-600">Loading user info...</p>
        )}
      </div>
    )
}

export default Profile;