import { useState } from "react";
import { Link } from "react-router-dom";
import { Dialog, Disclosure } from "@headlessui/react";
import Footer from "@/components/Footer";
import faqs from "@/constants/faqs";
import demoImage from "@/assets/Demo.png";
import { AlignJustify, Minus, Plus, X } from "lucide-react";
const navigations = [
    { name: "About Us", href: "#about-us" },
    { name: "Faqs", href: "#faq" },
    {
      name: "Community",
      // href: "https://www.facebook.com/groups/846181496988189/",
      href: "#",
      // target: "_blank",
    },
    {
      name: "Contact Us",
      href: "/contact",
    },
  ];

const LandingPage = () => {


  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-white">
      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <div className="-m-1.5 p-1.5">
              <span className="sr-only ">Ticket Chayo</span>

              <h1 className="text-xl font-semibold pl-4 text-[#FFB89F] sm:text-3xl sm:pl-10">Ticket Chayo</h1>
            </div>
          </div>

          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>

              <AlignJustify className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>

          <div className="hidden lg:flex lg:gap-x-12">
            {navigations.map((item) => (
              <a
                key={item.name}
                href={item.href}
                
                className="font-semibold leading-6 text-white text-m"
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link to="/login">
              <button className="font-semibold leading-6 text-white text-m">
                Log in <span aria-hidden="true">&rarr;</span>
              </button>
            </Link>
          </div>
        </nav>

        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50" />

          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full px-6 py-6 overflow-y-auto bg-white sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">InnoVisionX</span>
              </a>

              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>

                <X className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>

            <div className="flow-root mt-6">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="py-6 space-y-2">
                  {navigations.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-gray-900 rounded-lg hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>

                <div className="py-6">
                  <Link to="/login">
                    <button className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                      Log in
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

      <main>
        {/* Hero section */}
        <div className="relative h-full pb-16 overflow-hidden bg-gray-900 isolate pt-14 sm:pb-20">
          <img
            src="https://images.unsplash.com/photo-1485095329183-d0797cdc5676?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1&blend=555555&sat=-50&exp=0&blend-mode=multiply"
            alt=""
            className="absolute inset-0 object-cover w-full h-full -z-10"
          />

          <div
            className="absolute inset-x-0 overflow-hidden -top-40 -z-10 transform-gpu blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>

          <div className="px-6 mx-auto max-w-7xl lg:px-7">
            <div className="max-w-5xl px-0 py-32 mx-auto sm:py-48 lg:py-56">
              <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-white sm:text-6xl">
                Revolutionizing Event Management
                </h1>

                <p className="mt-6 text-lg leading-8 text-gray-300 font-md">
                Welcome to Chalchitra, where we simplify event management. Our platform efficiently handles all types of events, from concerts and conferences to community gatherings, ensuring a smooth experience for organizers and attendees alike.
                </p>
              </div>
            </div>

        
          </div>

          <div
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
        </div>

        {/* About Section */}
        <div id="about-us"></div>
        <div className="mt-20">
          {/* Feature section */}
          <div className="mt-20 sm:mt-38">
            <div className="px-6 mx-auto max-w-8xl lg:px-8">
              <div className="max-w-3xl mx-auto sm:text-center">
                <h1 className="text-4xl font-semibold leading-8 text-accent_primary">
                  How our platform works for you!
                </h1>

                <p className="mt-6 text-lg leading-8 text-gray-600">
                Our platform offers a secure, anonymous space for students to share valuable feedback, helping teachers refine their methods. This fosters a positive, collaborative learning environment focused on continuous growth and improvement.
                </p>
              </div>
            </div>
            <div className="relative pt-16 overflow-hidden">
              <div className="px-6 mx-auto max-w-7xl lg:px-8">
                <img
                  src={demoImage}
                  alt="App screenshot"
                  className="mb-[-12%] rounded-xl shadow-2xl ring-1 ring-gray-900/10"
                  width={2432}
                  height={1442}
                />
                <div className="relative" aria-hidden="true">
                  <div className="absolute -inset-x-20 bottom-0 bg-gradient-to-t from-white pt-[7%]" />
                </div>
              </div>
            </div>
          </div>

         
          
        </div>

        {/* FAQ section */}
        <div className="px-6 mx-auto mt-20 max-w-7xl sm:mt-38 lg:px-8" id="faq">
          <div className="max-w-4xl mx-auto divide-y divide-gray-900/10">
            <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
              Frequently asked questions
            </h2>

            <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
              {faqs.map((faq) => (
                <Disclosure as="div" key={faq.question} className="pt-6">
                  {({ open }) => (
                    <>
                      <dt>
                        <Disclosure.Button className="flex items-start justify-between w-full text-left text-gray-900">
                          <span className="text-base font-semibold leading-7">
                            {faq.question}
                          </span>

                          <span className="flex items-center ml-6 h-7">
                            {open ? (
                              <Minus className="w-6 h-6" aria-hidden="true" />
                            ) : (
                              <Plus className="w-6 h-6" aria-hidden="true" />
                            )}
                          </span>
                        </Disclosure.Button>
                      </dt>
                      <Disclosure.Panel as="dd" className="pr-12 mt-2">
                        <p className="text-base leading-7 text-gray-600">
                          {faq.answer}
                        </p>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ))}
            </dl>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="mt-24 bg-gray-900 sm:mt-56"
        aria-labelledby="footer-heading"
      >
        <Footer />
      </footer>
    </div>
  );
};

export default LandingPage;