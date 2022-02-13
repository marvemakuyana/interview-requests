import React, { useState } from 'react';

import logo from '../Logo_OfferZen2.jpg';
import { FaSort } from "react-icons/fa";
import { GrStatusGoodSmall } from "react-icons/gr";
import { AiOutlineSearch } from "react-icons/ai";

import InterviewData from '../interviewRequests.json';
import { IconColour, SearchIconColour } from './IconColor';

const InterviewRequests = () => {

    const [searchName, setSearchName] = useState("");
    const [data, setData] = useState(InterviewData);
    const columnsNotIncluded = ["role", "salary", "last_comms", "sent_by"];
    const [BackgroundColor, setBackgroundColor] = useState('Colour1')

    const filterNames = (value) => {
        if (value.toLowerCase().trim() === '') {
            setData(InterviewData)
        } else {
            const filteredData = InterviewData.filter(name => {
                return Object.keys(name).some(index =>
                    columnsNotIncluded.includes(index) ? false : name[index].toString().toLowerCase().includes(value.toLowerCase().trim()));
            });
            setData(filteredData)
        }
    }

    const handleInputChange = value => {
        setSearchName(value);
        filterNames(value);
    }

    const handleArchive = () => {
        InterviewData.map(data => {
            if (data.archived === false) {
                setBackgroundColor('')
            }
            else {
                setBackgroundColor('Colour1')
            }

            console.log(BackgroundColor)
        })

    }

    return (
        <div>
            <div>
                <div className=" mx-auto px-2 sm:px-6 lg:px-8" style={{ backgroundColor: '#343951' }}>
                    <div className="relative flex items-center justify-between h-16">
                        <div className="">
                            <div className="flex-shrink-0 flex  pt-2">
                                <img src={logo} alt="rss feed" className='object-contain h-30 w-30' style={{ marginLeft: '8.5rem', marginBottom: '10px' }} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex relative">
                    <input type="text"
                        placeholder="Search"
                        value={searchName}
                        onChange={e => handleInputChange(e.target.value)}
                        className='px-3 py-2 mt-4 mb-4 ml-20  bg-white border border-gray-300  ' style={{ marginLeft: '10.5rem' }} />
                    <div className="searchIcon">
                        <SearchIconColour><AiOutlineSearch /></SearchIconColour>
                    </div>
                </div>
                <div className="flex flex-col" style={{ backgroundColor: '#E4EBEF' }}>
                    <div className=" overflow-x-auto sm:-mx-6">
                        <div className=" inline-block  ">
                            <div className="overflow-hidden  ">

                                <div><p className='text-gray-500' style={{ textAlign: 'right', margin: '20px' }}>{InterviewData.length} interview requests</p></div>
                                <table className="divide-y divide-gray-200" style={{ marginLeft: '200px', marginBottom: '50px' }}>
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold font-ProximaNova text-gray-700  tracking-wider">Candidate</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-700  tracking-wider">Role</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-700  tracking-wider" style={{ position: 'relative' }}>Last Communication<FaSort style={{
                                                top: 'calc(50% - 8px)',
                                                position: 'absolute',
                                                right: '112px'
                                            }} /> </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-700  tracking-wider">Salary</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-700  tracking-wider">Sent By</th>
                                            <th scope="col" className="relative px-6 py-3">
                                                <span className="sr-only">Actions</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {data.map((data, index) => (
                                            <tr key={index} className={BackgroundColor === 'Colour1' ? 'none' : 'colour1'}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-10 w-10">
                                                            <img className="h-10 w-10 rounded-full" src={data.image} alt="" />
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className={data.last_comms.unread === true ? "text-sm font-medium text-gray-500" : "text-sm text-gray-500"}>{data.candidate}</div>

                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className={data.last_comms.unread === true ? "text-sm text-gray-500 font-medium" : "text-sm text-gray-500"}>{data.role}</div>

                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={data.last_comms.unread === true ? "px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-medium" : "px-6 py-4 whitespace-nowrap text-sm text-gray-500"} style={{ position: 'relative' }}> {data.last_comms.unread === true &&
                                                        <IconColour><GrStatusGoodSmall style={{
                                                            top: 'calc(50% - 8px)',
                                                            position: 'absolute',
                                                            left: '3px'
                                                        }} /></IconColour>}
                                                        {data.last_comms.description} {(data.last_comms.date_time).slice(0, 11)} </span>
                                                </td>
                                                <td className={data.last_comms.unread === true ? "px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-medium" : "px-6 py-4 whitespace-nowrap text-sm text-gray-500"}>{data.salary}</td>
                                                <td className={data.last_comms.unread === true ? "px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-medium" : "px-6 py-4 whitespace-nowrap text-sm text-gray-500"}>{data.sent_by}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    {/* <a href="#" className="text-indigo-600 hover:text-indigo-900">{}</a> */}
                                                    <button onClick={handleArchive}
                                                        className='font-bold inline-flex justify-center vertical-align: middle w-full px-3 py-4 text-sm' style={{ color: '#5EA5EE ' }}>
                                                        {`${data.archived === false ? ' Archive' : ' Unarchive'}`}
                                                    </button>
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