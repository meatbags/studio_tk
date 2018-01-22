import Vector from './vector';
import Limit from './limit';

class FabricInspector {
  constructor() {
    // fabric inspection widget

    this.active = false;
    this.id = null;
    this.parent = null;
    this.target = null;
    this.offset = new Vector();
    this.limit = {
      x: new Limit(),
      y: new Limit()
    };
    this.mouse = {
      start: new Vector(),
      current: new Vector(),
      delta: new Vector()
    }
  }

  resize(image) {
    // resize and position image

    const x = -image.naturalWidth / 2;
    const y = -image.naturalHeight / 2;

    $(image).css({
      position: 'absolute',
      width: image.naturalWidth + 'px',
      height: image.naturalHeight + 'px',
      top: 0,
      left: 0,
      transform: this.getTransformString(x, y)
    })
  }

  conformImages() {
    // conform all images

    $('.inspector__image').each((i, e) => {
      if (!$(e).hasClass('formatted')) {
        // resize, reposition

        this.resize(e);
        e.onload = () => { thi.resize(e); };

        // register

        $(e).addClass('formatted');
      }
    });
  }

  doc() {
    // setup doc

    if (isHome || $('.inspector').length) {
      // resize images

      $('.inspector__image').each((i, e) => {
        this.resize(e);
        e.onload = () => { this.resize(e); };
      });

      // set events

      this.events();
    }
  }

  deactivate() {
    this.active = false;
  }

  events() {
    // dom events

    $('body').on('mouseover', '.inspector', (e) => {
			// get selectors, init transform

      console.log(e);
      this.active = true;
      this.id = `#${$(e).attr('id')}`;
      this.mouse.start.set(e.clientX, e.clientY);
      this.parent = $(this.id);
      this.target = $(this.id + ' .inspector__image');
      this.offset.set(this.target.position().left, this.target.position().top);

			// set limits

			const w0 = this.target.outerWidth();
			const h0 = this.target.outerHeight();
			const w1 = this.parent.outerWidth();
			const h1 = this.parent.outerHeight();

      this.limit.x.set(-(w0 - w1), 0);
      this.limit.y.set(-(h0 - h1), 0);
		});

		$('body').on('mousemove', (e) => {
      // handle mouse

      if (this.active) {
        this.mouse.current.set(e.clientX, e.clientY);
        this.mouse.delta.set(e.clientX - this.mouse.start.x, e.clientY - this.mouse.start.y);

        // get new position

        const x = this.limit.x.clamp(this.mouse.delta.x * 0.5 + this.offset.x);
        const y = this.limit.y.clamp(this.mouse.delta.y * 0.5 + this.offset.y);

        // css transform

        this.target.css('transform', this.getTransformString(x, y));
      }
    });

    // deactivation events

		$('body').on('mouseout', '.inspector', () => { this.deactivate(); });
    $('body').on('mouseup', () => { this.deactivate(); });
    $(document).mouseleave(() => { this.deactivate(); });
  }

  getTransformString(x, y) {
    // get css transform string

    return `translate(${x}px, ${y}px)`;
  }
}

export default FabricInspector;
