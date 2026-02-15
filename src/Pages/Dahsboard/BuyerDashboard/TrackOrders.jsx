import React from 'react';
import { useLoaderData } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const TrackOrders = () => {
    const { trackingId } = useLoaderData();
    console.log(trackingId)
    const axiosSecure = useAxiosSecure();

    const { data: trackings = [], isLoading } = useQuery({
        queryKey: ['tracking', trackingId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/trackings/${trackingId}/log`);
            return res.data;
        },
        enabled: !!trackingId
    });

    if (isLoading) return <p>Loading...</p>;

    // Sort by loggedAt (oldest → newest)
    const sortedTrackings = [...trackings].sort(
        (a, b) => new Date(a.loggedAt) - new Date(b.loggedAt)
    );

    const latestId = sortedTrackings[sortedTrackings.length - 1]?._id;

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6">
                Tracking ID: {trackingId}
            </h2>

            <ul className="timeline timeline-vertical">
                {sortedTrackings.map(log => {
                    const isLatest = log._id === latestId;

                    return (
                        <li key={log._id}>
                            <div className="timeline-start text-sm">
                                {new Date(log.loggedAt).toLocaleString()}
                            </div>

                            <div className="timeline-middle">
                                <div
                                    className={`h-4 w-4 rounded-full ${
                                        isLatest
                                            ? 'bg-green-600'
                                            : 'bg-gray-400'
                                    }`}
                                ></div>
                            </div>

                            <div
                                className={`timeline-end timeline-box ${
                                    isLatest
                                        ? 'border-green-600 border-2'
                                        : ''
                                }`}
                            >
                                <p className="font-semibold">
                                    {log.status}
                                </p>

                                {log.location && (
                                    <p className="text-sm text-gray-600">
                                        Location: {log.location}
                                    </p>
                                )}

                                {log.note && (
                                    <p className="text-sm mt-1">
                                        {log.note}
                                    </p>
                                )}
                            </div>
                            <hr />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default TrackOrders;
