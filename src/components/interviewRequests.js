import React from 'react';
import InterviewData from '../interviewRequests.json';
import logo from '../Logo_OfferZen.jpg';
import { FaSort } from "react-icons/fa";
import { GrStatusGoodSmall } from "react-icons/gr";

const InterviewRequests = () => {

    return (
        <div >
            <div>
                <div className=" mx-auto px-2 sm:px-6 lg:px-8 bg-slate-600">
                    <div className="relative flex items-center justify-between h-16">
                        <div className="flex-1 flex items-center justify-center mt-16">
                            <div className="flex-shrink-0 flex  pt-2">
                                {/* <img src={logo} alt="rss feed" width='50' /> */}
                            </div>
                        </div>

                    </div>
                </div>

                <div className="flex flex-col bg-slate-100">
                    <div className=" overflow-x-auto sm:-mx-6">
                        <div className=" inline-block  ">
                            <div className="shadow overflow-hidden border-b border-gray-200 ">

                                <div><p style={{ textAlign: 'right' }}>{InterviewData.length} interview requests</p></div>
                                <table className="divide-y divide-gray-200" style={{ marginLeft: '200px' }}>
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider">Candidate</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider">Role</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider" style={{ position: 'relative' }}><span>Last Communication<FaSort style={{
                                                top: 'calc(50% - 8px)',
                                                position: 'absolute',
                                                right: '112px'
                                            }} /></span> </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider">Salary</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider">Sent By</th>
                                            <th scope="col" className="relative px-6 py-3">
                                                <span className="sr-only">Edit</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {InterviewData.map((data, index) => (
                                            <tr key={index}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-10 w-10">
                                                            <img className="h-10 w-10 rounded-full" src={data.image} alt="" />
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">{data.candidate}</div>

                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{data.role}</div>

                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"> {data.last_comms.unread === true && <GrStatusGoodSmall />} {data.last_comms.description} {(data.last_comms.date_time).slice(0, 11)} </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.salary}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.sent_by}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <a href="#" className="text-indigo-600 hover:text-indigo-900">Editbbbbbbb</a>
                                                </td>
                                            </tr>
                                        ))}



                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
}

export default InterviewRequests