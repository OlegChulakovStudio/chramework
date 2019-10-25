Installment form:

    <InstallmentForm
        isFetching={false}
        modal={{
            component: ModalInfo,
            options: {
                title: 'Отлично!',
                text: 'Подарок уже в&nbsp;пути на&nbsp;вашу почту.',
                button: {
                    onClick: () => console.log('close modal'),
                    to: '/design',
                    text: 'На главную',
                    arrow: true,
                    bluePale: true
                },
                hideCloseOnMobile: true
            }
        }}
        eventType='default_event_type'
        buttonText="Отправить"
        fetch={data => console.log('data: ', data)}
        onSubmit={() => console.log('sent!')}
        openModal={() => console.log('open')}
        closeModal={() => console.log('close')}
    />
