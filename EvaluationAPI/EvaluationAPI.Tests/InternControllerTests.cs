using AutoMapper;
using EvaluationAPI.Controllers;
using EvaluationAPI.Services.InternService;
using Moq;
using System;
using Xunit;

namespace EvaluationAPI.Tests
{
    public class InternControllerTests
    {
        private readonly Mock<IInternService> _mockInternService = new Mock<IInternService>();
        private readonly Mock<IMapper> _mockMapper = new Mock<IMapper>();

        private InternsController _controller;

        [Fact]
        public async void GetAllInterns_Success()
        {
            _controller = new InternsController(_mockInternService.Object, _mockMapper.Object);
            await _controller.GetAllInternsAsync();
            _mockInternService.Verify(service => service.GetAllAsync(), Times.Once());
        }

        [Fact]
        public async void GetOneIntern_Success()
        {
            _controller = new InternsController(_mockInternService.Object, _mockMapper.Object);
            Guid id = Guid.NewGuid();

            await _controller.GetInternByIdAsync(id);
            _mockInternService.Verify(service => service.GetByIdAsync(id), Times.Once());

        }
    }
}
