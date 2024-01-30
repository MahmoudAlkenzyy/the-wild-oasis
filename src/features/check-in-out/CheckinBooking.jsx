import styled from 'styled-components';
import BookingDataBox from '../../features/bookings/BookingDataBox';

import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';

import { useMoveBack } from '../../hooks/useMoveBack';
import { useBooking } from '../bookings/useBooking';
import Spinner from '../../ui/Spinner';
import Checkbox from '../../ui/Checkbox';
import { useEffect, useState } from 'react';
import { useChecking } from './useCheckin';
import { useSettings } from '../settings/useSettings';
import { formatCurrency } from '../../utils/helpers';

const Box = styled.div`
    /* Box */
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-100);
    border-radius: var(--border-radius-md);
    padding: 2.4rem 4rem;
`;

function CheckinBooking() {
    const [confirmPaid, setConfirmPaid] = useState(false);
    const [addBreakfast, setAddBreakfast] = useState(false);
    const { booking, isLoading } = useBooking();
    const moveBack = useMoveBack();
    const { isLoading: isLoadingSettings, settings } = useSettings();
    const { Checkin, isCheckingIn } = useChecking();

    useEffect(() => {
        setConfirmPaid(booking?.isPaid || false);
    }, [booking]);
    if (isLoading || isLoadingSettings) return <Spinner />;
    const {
        id: bookingId,
        guests,
        totalPrice,
        numGuests,
        hasBreakfast,
        numNights,
    } = booking;
    const optionalBreakfastPrice =
        settings.breakfastPrice * numNights * numGuests;

    function handleCheckin() {
        if (!confirmPaid) return;

        if (addBreakfast) {
            Checkin({
                bookingId,
                breakfast: {
                    hasBreakfast: true,
                    extrasPrice: optionalBreakfastPrice,
                    totalPrice: totalPrice + optionalBreakfastPrice,
                },
            });
        } else {
            Checkin({ bookingId, breakfast: {} });
        }
    }

    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">Check in booking #{bookingId}</Heading>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking} />
            {!hasBreakfast && (
                <Box>
                    <Checkbox
                        id="breakfast"
                        value={addBreakfast}
                        onChange={() => {
                            setAddBreakfast((state) => !state);
                            setConfirmPaid(false);
                        }}
                    >
                        You want add breakfast by{' '}
                        {formatCurrency(optionalBreakfastPrice)}
                    </Checkbox>
                </Box>
            )}
            <Box>
                <Checkbox
                    id="confirm"
                    disabled={confirmPaid || isCheckingIn}
                    value={confirmPaid}
                    onChange={() => setConfirmPaid((state) => !state)}
                >
                    {' '}
                    I confirm that {booking.fullName} has paid the total amount
                    of{' '}
                    {!addBreakfast
                        ? formatCurrency(totalPrice)
                        : `${formatCurrency(
                              totalPrice + optionalBreakfastPrice
                          )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                              optionalBreakfastPrice
                          )})`}
                </Checkbox>
            </Box>
            <ButtonGroup>
                <Button
                    disable={!confirmPaid || isCheckingIn}
                    onClick={handleCheckin}
                >
                    Check in booking #{bookingId}
                </Button>

                <Button variation="secondary" onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
}

export default CheckinBooking;
