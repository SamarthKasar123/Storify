const Home = () => {
    return (
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-emerald-500 mb-4">
              Welcome to Storify
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Collaborate, Create, and Share Amazing Stories Together
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-emerald-500 mb-4">Create</h3>
                <p className="text-gray-400">
                  Start your own story and let your creativity flow.
                </p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-emerald-500 mb-4">Collaborate</h3>
                <p className="text-gray-400">
                  Work with others to develop engaging narratives.
                </p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-emerald-500 mb-4">Share</h3>
                <p className="text-gray-400">
                  Share your stories with the world and get feedback.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Home;