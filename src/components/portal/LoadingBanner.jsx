/* If any other page in the portal is waiting on something before it can do what it needs to do, it renders this component */
function LoadingBanner() {
    return (
        <>
          <div class="flex flex-col justify-center justify-self-center items-center">
            <div class="flex flex-col bg-pgreen rounded-xl border-black border-2 mb-20">
              <p class="text-4xl p-5 m-5 mb-16 text-center">Loading; please wait...</p>
            </div>
          </div>
        </>
    );
}

export default LoadingBanner;