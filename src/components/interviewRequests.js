import React, { useState } from 'react';
import moment from 'moment';
import { FaSort } from "react-icons/fa";
import { GrStatusGoodSmall } from "react-icons/gr";
import { AiOutlineSearch } from "react-icons/ai";

import interviewData from '../interviewRequests.json';
import logo from '../offerzen-logo-white.svg';
import { IconColour, SearchIconColour, SortIconColour } from './IconColor';

const InterviewRequests = () => {

    const [searchName, setSearchName] = useState("");
    const [data, setData] = useState(interviewData);
    const columnsNotIncluded = ["role", "salary", "last_comms", "sent_by"];
    const [backgroundColor, setBackgroundColor] = useState(interviewData)
    const [showArchived, setShowArchived] = useState(false);

    const salaryFormat = (value) => {
        return value.toString().replace(/(?=(\d{3})+(?!\d))/g, ' ');
    };

    const dateFormat = (value) => {
        const todayDate = new Date('2022-02-14 21:17:26').getTime();
        const date = new Date(value).getTime();
        const formatDate = moment(date).format('L');
        const date_time = moment(date).format('h:mma');
        const candidateDate = moment(todayDate).diff(moment(date), 'hours');

        let dateDisplayed = formatDate;

        if (candidateDate < 24) {
            dateDisplayed = date_time;
        }
        if (candidateDate > 24 && candidateDate < 47) {
            dateDisplayed = 'Yesterday';
        }

        return dateDisplayed;
    };

    const filterNames = (value) => {
        if (value.toLowerCase().trim() === '') {
            setData(interviewData)
        } else {
            const filteredData = interviewData.filter(name => {
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

    const handleArchive = (i) => {
        const archivedResults = backgroundColor.map((result, index) => {
            if (index === i) {
                result.archived = !result.archived
            }
            return result
        });

        setBackgroundColor([...archivedResults])
    }

    const handleShowArchived = () => {
        setShowArchived(!showArchived)
    }

    const rowsToShow = () => {
        if (showArchived) {
            return data.map((data, index) => {
                return (
                    <tr key={index} className={data.archived ? 'colour1' : 'colour2'}>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                    <img className="h-10 w-10 rounded-full" src={data.image} alt="" />
                                </div>
                                <div className="ml-4">
                                    <div className="text-sm text-gray-500">{data.candidate}</div>

                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{data.role ? data.role : '-'}</div>

                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <p className="px-6 py-4 whitespace-nowrap text-sm text-gray-500" style={{ position: 'relative' }}> {data.last_comms.unread &&
                                <IconColour><GrStatusGoodSmall style={{
                                    top: 'calc(50% - 8px)',
                                    position: 'absolute',
                                    left: '3px'
                                }} /></IconColour>}
                                {data.last_comms.description} <span className='date'>{dateFormat(data.last_comms.date_time)} </span></p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm ">R{salaryFormat(data.salary)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.sent_by}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            {/* <a href="#" className="text-indigo-600 hover:text-indigo-900">{}</a> */}
                            <button onClick={() => handleArchive(index)}
                                className='font-bold inline-flex justify-center vertical-align: middle w-full px-3 py-4 text-sm' style={{ color: '#5EA5EE ' }}>
                                {`${data.archived ? ' Unarchive' : ' Archive'}`}
                            </button>
                        </td>

                    </tr>
                );
            });
        } else {
            return data.map((data, index) => {
                if (data.archived === false) {
                    return (
                        <tr key={index} className={data.archived ? 'colour1' : 'colour2'}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10">
                                        <img className="h-10 w-10 rounded-full" src={data.image} alt="" />
                                    </div>
                                    <div className="ml-4">
                                        <div className="text-sm text-gray-500">{data.candidate}</div>

                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">{data.role}</div>

                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <p className="px-6 py-4 whitespace-nowrap text-sm text-gray-500" style={{ position: 'relative' }}> {data.last_comms.unread &&
                                    <IconColour><GrStatusGoodSmall style={{
                                        top: 'calc(50% - 8px)',
                                        position: 'absolute',
                                        left: '3px'
                                    }} /></IconColour>}
                                    {data.last_comms.description} <span className='date'>{dateFormat(data.last_comms.date_time)}</span> </p>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">R{salaryFormat(data.salary)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.sent_by}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button onClick={() => handleArchive(index)}
                                    className='font-bold inline-flex justify-center vertical-align: middle w-full px-3 py-4 text-sm' style={{ color: '#5EA5EE ' }}>
                                    {`${data.archived ? ' Unarchive' : ' Archive'}`}
                                </button>
                            </td>

                        </tr>
                    );
                }
            });
        }
    }

    return (
        <div>
            <div>
                <div className=" mx-auto px-2 sm:px-6 lg:px-8" style={{ backgroundColor: '#343951' }}>
                    <div className="relative flex items-center justify-between h-16">
                        <div className="">
                            <div className="flex-shrink-0 flex  pt-2">
                                <img src={logo} alt="rss feed" className='object-contain h-30 w-30' style={{ marginLeft: '5.5rem', marginBottom: '10px' }} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex relative">
                    <input type="text"
                        placeholder="Search"
                        value={searchName}
                        onChange={e => handleInputChange(e.target.value)}
                        className='px-3 py-2 mt-4 mb-4 ml-20 bg-white border border-gray-300  ' style={{ marginLeft: '7.5rem', width: '210px', height: '40px' }} />
                    <div className="searchIcon">
                        <SearchIconColour><AiOutlineSearch /></SearchIconColour>
                    </div>
                    <p className='whitespace-nowrap text-sm text-gray-500text-gray-500' style={{ marginLeft: '720px', marginTop: '11px' }}>Show archived
                        <input type="checkbox"
                            name="checked"
                            value={showArchived}
                            onChange={handleShowArchived}
                            className='px-3 py-2 mt-4 mb-4 bg-white border border-gray-300' style={{ marginLeft: '8px', marginBottom: '0px' }}
                        />
                    </p>
                </div>
                <div className="flex flex-col" style={{ backgroundColor: '#E4EBEF' }}>
                    <div className=" overflow-x-auto sm:-mx-6">
                        <div className=" inline-block  ">
                            <div className="overflow-hidden  ">

                                <div><p className='whitespace-nowrap text-sm text-gray-500' style={{ textAlign: 'right', marginTop: '20px', marginLeft: '30px', marginBottom: '20px' }}>{interviewData.length} interview requests</p></div>
                                <table className="divide-y divide-gray-200" style={{ marginLeft: '150px', marginBottom: '50px' }}>
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-700  tracking-wider">Candidate</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-700  tracking-wider">Role</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-700  tracking-wider" style={{ position: 'relative' }}>Last Communication<SortIconColour><FaSort style={{
                                                top: 'calc(50% - 8px)',
                                                position: 'absolute',
                                                right: '60px'
                                            }} /> </SortIconColour></th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-700  tracking-wider">Salary</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-700  tracking-wider">Sent By</th>
                                            <th scope="col" className="relative px-6 py-3">
                                                <span className="sr-only">Actions</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {rowsToShow()}
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